"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

interface Project { id: string; title: string; description: string; imgUrl1?: string; imgUrl2?: string; imgUrl3?: string; }

export default function ProjectsAdminPage(){
  const router = useRouter();
  const [projects,setProjects] = useState<Project[]>([]);
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [files,setFiles] = useState<(File|null)[]>([null,null,null]);
  const [saving,setSaving] = useState(false);
  const [error,setError] = useState<string|null>(null);

  useEffect(()=>{ if(!sessionStorage.getItem('adminUser')) router.push('/admin/login'); },[router]);
  useEffect(()=>{ (async()=>{ const snap = await getDocs(collection(db,'projects')); setProjects(snap.docs.map(d=>({ id:d.id, ...(d.data() as any) }))); })(); },[]);

  async function createProject(){
    if(!title.trim()) return;
    try {
      setSaving(true); setError(null);
      const urls:string[] = [];
      for(const f of files){
        if(f){
          const fd = new FormData(); fd.append('file',f); fd.append('prefix','projects');
          const res = await fetch('/api/r2-upload',{ method:'POST', body: fd });
          const data = await res.json(); urls.push(data.url);
        } else urls.push('');
      }
      const ref = await addDoc(collection(db,'projects'), { title, description, imgUrl1: urls[0]||undefined, imgUrl2: urls[1]||undefined, imgUrl3: urls[2]||undefined });
      setProjects(prev=>[{ id: ref.id, title, description, imgUrl1: urls[0]||undefined, imgUrl2: urls[1]||undefined, imgUrl3: urls[2]||undefined }, ...prev]);
      setTitle(''); setDescription(''); setFiles([null,null,null]);
    } catch(e:any){ setError(e.message||'Save failed'); }
    finally { setSaving(false); }
  }

  async function deleteProject(id:string){
    await deleteDoc(doc(db,'projects',id));
    setProjects(p=>p.filter(x=>x.id!==id));
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Projects Management</h2>
      <div className="space-y-3 border p-4 rounded">
        <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} className="w-full border px-2 py-1 rounded" />
        <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} className="w-full border px-2 py-1 rounded" rows={3} />
        <div className="flex flex-wrap gap-4">
          {files.map((f,i)=>(
            <div key={i} className="text-xs">
              <label className="block mb-1">Image {i+1}</label>
              <input type="file" accept="image/*" onChange={e=>{ const copy=[...files]; copy[i]=e.target.files?.[0]||null; setFiles(copy);} } />
              {f && <span className="block mt-1 text-gray-600 w-32 truncate">{f.name}</span>}
            </div>
          ))}
        </div>
        <button onClick={createProject} disabled={saving} className="bg-gray-800 text-white px-4 py-2 rounded text-sm disabled:opacity-50">{saving?'Saving...':'Create Project'}</button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
      <ul className="space-y-3">
        {projects.map(p=> (
          <li key={p.id} className="border rounded p-3">
            <h4 className="font-semibold">{p.title}</h4>
            <p className="text-xs text-gray-600 mb-2">{p.description}</p>
            <div className="flex gap-2">
              {[p.imgUrl1,p.imgUrl2,p.imgUrl3].filter(Boolean).map((u,i)=>(<img key={i} src={u} className="w-16 h-16 object-cover rounded" />))}
            </div>
            <div className="mt-2 flex gap-2">
              <button onClick={()=>deleteProject(p.id)} className="text-xs text-red-600 hover:underline">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


