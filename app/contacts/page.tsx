"use client";
import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import Image from "next/image";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const validate = () => {
    if (!name.trim()) return "Please enter your name";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email";
    if (!contact.trim()) return "Please enter a contact number";
    if (!subject.trim()) return "Please enter a subject";
    if (!message.trim()) return "Please enter your message";
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    const err = validate();
    if (err) {
      setStatus({ type: "error", text: err });
      return;
    }
    try {
      setLoading(true);
      await addDoc(collection(db, "contacts"), {
        name: name.trim(),
        email: email.trim(),
        contact: contact.trim(),
        subject: subject.trim(),
        message: message.trim(),
        createdAt: serverTimestamp(),
      });
      setStatus({ type: "success", text: "Thank you! Your message has been sent." });
      setName("");
      setEmail("");
      setContact("");
      setSubject("");
      setMessage("");
    } catch {
      setStatus({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{paddingTop: "5rem" , paddingBottom: "5rem"}} className="relative min-h-screen flex items-center justify-center py-16 bg-gray-900">
      {/* Darkened background with groupPeople.png */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50"></div>
        <Image
          src="/groupPeople.png"
          alt="Background"
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "top center" }}
          className="pointer-events-none select-none"
          priority
        />
      </div>
      
      
  <div className="relative z-10 w-full max-w-2xl mx-4 sm:mx-6">
        <div style={{padding: "3rem"}} className="bg-white rounded-xl shadow-2xl p-10 md:p-12 border border-gray-100">
          <div style={{marginBottom:"2rem"}} className="text-center mb-10">
            <h1 style={{marginBottom:"1rem"}} className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Contact Us</h1>
    <p className="text-gray-600 mt-2">We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.</p>
          </div>
          
          <form onSubmit={onSubmit} className="space-y-7">
            <div style={{marginBottom: "1rem"}} className="grid grid-cols-1 md:grid-cols-2 gap-7">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3.5 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3.5 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            
            <div style={{marginBottom: "1rem"}} className="grid grid-cols-1 md:grid-cols-2 gap-7">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3.5 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="+1 (234) 567-8900"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3.5 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="What is this regarding?"
                />
              </div>
            </div>
            
            <div style={{marginBottom: "1rem"}} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                rows={5}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3.5 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please share your message or inquiry..."
              />
            </div>
            
            {status && (
              <div className={`rounded-lg p-4 text-center ${status.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {status.text}
              </div>
            )}
            
            <div className="flex items-center justify-center pt-6">
              <button
              style={{padding: "0.5rem" , color: "white"}}
                type="submit"
                disabled={loading}
                className="relative inline-flex items-center justify-center overflow-hidden gap-2 px-8 py-4 rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-70 font-medium shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-300 transition-all duration-200 hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg> */}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}