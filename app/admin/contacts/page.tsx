"use client";
import React, { useEffect, useMemo, useState } from "react";
import { collection, getDocs, limit, orderBy, query, startAfter, type QueryDocumentSnapshot, type DocumentData } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useRequireAdminSession } from "../_hooks/useRequireAdminSession";

interface ContactDoc {
  id: string;
  name: string;
  email: string;
  contact: string;
  subject: string;
  message: string;
  createdAt?: Date;
}

const PAGE_SIZE = 10;

export default function AdminContactsPage() {
  useRequireAdminSession();
  // pagination state
  const [pages, setPages] = useState<ContactDoc[][]>([]);
  const [cursors, setCursors] = useState<Array<QueryDocumentSnapshot<DocumentData> | null>>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [canNext, setCanNext] = useState(false);

  const baseQuery = useMemo(() => query(collection(db, "contacts"), orderBy("createdAt", "desc")), []);

  const load = async (cursor?: QueryDocumentSnapshot<DocumentData> | null) => {
    try {
      setLoading(true);
      setError(null);
      let qy = query(baseQuery, limit(PAGE_SIZE));
      if (cursor) qy = query(baseQuery, startAfter(cursor), limit(PAGE_SIZE));
      const snap = await getDocs(qy);
      const docs = snap.docs.map((d) => {
        const data = d.data() as DocumentData;
        return {
          id: d.id,
          name: data.name || "",
          email: data.email || "",
          contact: data.contact || "",
          subject: data.subject || "",
          message: data.message || "",
          createdAt: data.createdAt?.toDate?.(),
        } as ContactDoc;
      });
      // when cursor provided, we're moving to the next page; append
      setPages((prev) => (cursor ? [...prev, docs] : [docs]));
      setCursors((prev) => (cursor ? [...prev, (snap.docs[snap.docs.length - 1] || null)] : [(snap.docs[snap.docs.length - 1] || null)]));
      setCanNext(snap.docs.length === PAGE_SIZE);
      if (!cursor) setPageIndex(0);
    } catch {
      setError("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goNext = async () => {
    if (loading) return;
    const currentCursor = cursors[pageIndex];
    if (!currentCursor) return;
    await load(currentCursor);
    setPageIndex((i) => i + 1);
  };

  const goPrev = () => {
    if (loading) return;
    if (pageIndex === 0) return;
    setPageIndex((i) => i - 1);
    // canNext depends on whether we already fetched beyond this page
    setCanNext(true);
  };

  const items = pages[pageIndex] || [];
  const canPrev = pageIndex > 0;

  // modal
  const [openId, setOpenId] = useState<string | null>(null);
  const selected = items.find(i => i.id === openId) || null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="bg-white rounded-2xl shadow p-6 md:p-8 max-h-[82vh] overflow-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Contacts</h1>
            <div className="text-sm text-gray-600 flex items-center gap-3">
              <span>Page {pageIndex + 1}</span>
              <div className="inline-flex items-center gap-2">
                <button onClick={goPrev} disabled={!canPrev || loading} className="px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50">Prev</button>
                <button onClick={goNext} disabled={!canNext || loading} className="px-3 py-1.5 rounded-full bg-gray-900 text-white hover:bg-black disabled:opacity-50">Next</button>
              </div>
            </div>
          </div>
          {error && <div className="text-sm text-red-600 mb-3">{error}</div>}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Email</th>
                  <th className="py-2 pr-4">Contact</th>
                  <th className="py-2 pr-4">Subject</th>
                  <th className="py-2 pr-4">Message</th>
                  <th className="py-2 pr-4">Date</th>
                  <th className="py-2 pr-0 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((c) => (
                  <tr key={c.id} className="border-b last:border-0 align-top">
                    <td className="py-2 pr-4 text-gray-900 font-medium">{c.name}</td>
                    <td className="py-2 pr-4 text-blue-600"><a href={`mailto:${c.email}`}>{c.email}</a></td>
                    <td className="py-2 pr-4">{c.contact}</td>
                    <td className="py-2 pr-4">{c.subject}</td>
                    <td className="py-2 pr-4 max-w-[320px] whitespace-pre-wrap">{c.message}</td>
                    <td className="py-2 pr-4 text-gray-500">{c.createdAt ? c.createdAt.toLocaleString() : "-"}</td>
                    <td className="py-2 pr-0 text-right">
                      <button aria-label="View details" onClick={() => setOpenId(c.id)} className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M1.5 12s3.75-6.75 10.5-6.75S22.5 12 22.5 12 18.75 18.75 12 18.75 1.5 12 1.5 12Zm10.5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></svg>
                      </button>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && !loading && (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-gray-500">No contacts yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-center mt-5 gap-3">
            <button onClick={goPrev} disabled={!canPrev || loading} className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50">Prev</button>
            <span className="text-sm text-gray-600">Page {pageIndex + 1}</span>
            <button onClick={goNext} disabled={!canNext || loading} className="px-4 py-2 rounded-full bg-gray-900 text-white hover:bg-black disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpenId(null)} />
          <div role="dialog" aria-modal="true" className="relative z-10 w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 md:p-7">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Contact Details</h2>
              <button onClick={() => setOpenId(null)} aria-label="Close" className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M6.225 4.811a1 1 0 0 1 1.414 0L12 9.172l4.361-4.361a1 1 0 1 1 1.415 1.414L13.415 10.586l4.36 4.361a1 1 0 1 1-1.414 1.414L12 12l-4.361 4.361a1 1 0 1 1-1.414-1.414l4.36-4.361-4.36-4.361a1 1 0 0 1 0-1.414Z"/></svg>
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex"><span className="w-28 text-gray-500">Name</span><span className="text-gray-900 font-medium">{selected.name}</span></div>
              <div className="flex"><span className="w-28 text-gray-500">Email</span><a className="text-blue-600" href={`mailto:${selected.email}`}>{selected.email}</a></div>
              <div className="flex"><span className="w-28 text-gray-500">Contact</span><span>{selected.contact}</span></div>
              <div className="flex"><span className="w-28 text-gray-500">Subject</span><span>{selected.subject}</span></div>
              <div>
                <div className="text-gray-500 mb-1">Message</div>
                <div className="p-3 rounded-md bg-gray-50 text-gray-800 whitespace-pre-wrap max-h-60 overflow-auto">{selected.message}</div>
              </div>
              <div className="flex"><span className="w-28 text-gray-500">Date</span><span className="text-gray-600">{selected.createdAt ? selected.createdAt.toLocaleString() : '-'}</span></div>
            </div>
            <div className="mt-5 flex items-center justify-end gap-2">
              <button onClick={() => setOpenId(null)} className="px-4 py-2 rounded-full bg-gray-900 text-white hover:bg-black">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
