"use client"
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { CldUploadWidget } from "next-cloudinary";
import axios from 'axios'; 
import { Alert } from '@mui/material';
import { useRouter } from 'next/navigation';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function BlogForm() {
  const router = useRouter()
  const [alert, setAlert] = useState({ message: "", severity: "", visible: false });
  const [input, setInput] = useState({
    title: "",
    description: "",
    blogImage: ""
  });

  const stripHtml = (html) => {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  const createBlog = async (e) => {
    e.preventDefault();

    const api = "http://localhost:8000/blogs";
    const strippedDescription = stripHtml(input.description);

    try {
      const res = await axios.post(api, { ...input, description: strippedDescription });
      setAlert({ message: "Амжилттай нийтэллээ.", severity: "success", visible: true });
      setInput({ title: "", description: "", blogImage: "" });
      router.push("/")

    } catch (error) {
      setAlert({ message: "Амжилтгүй", severity: "error", visible: true });
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-slate-100 justify-center items-center py-[40px]">
      <div className="flex flex-col bg-slate-50 p-6 rounded-xl gap-6">
        <p className="text-center font-bold text-[24px]">Шинэ нийтлэл оруулах</p>
        {alert.visible && (
          <Alert severity={alert.severity} onClose={() => setAlert({ ...alert, visible: false })}>
            {alert.message}
          </Alert>
        )}

        <div>
          <p className='font-bold'>Гарчиг</p>
          <input 
            onChange={(e) => setInput((prev) => ({ ...prev, title: e.target.value }))} 
            className="w-full px-4 py-2" 
            placeholder="Гарчиг" 
          />
        </div>
        <div>
          <p className='font-bold'>Дэлгэрэнхий</p>
          <ReactQuill 
            onChange={(content) => setInput((prev) => ({ ...prev, description: content }))} 
          />
        </div>
        <div>
          <p className='font-bold'>Зураг</p>
          <CldUploadWidget
            uploadPreset="uehrhnkw"
            onSuccess={(result, { widget }) => {
              setInput((prev) => ({ ...prev, blogImage: result?.info?.secure_url }));
              widget.close();
            }}
          >
            {({ open }) => (
              <button 
                className='p-2 bg-slate-100 border rounded-xl'
                onClick={(e) => { e.preventDefault(); open(); }}
              >
                Зураг оруулах
              </button>
            )}
          </CldUploadWidget>
        </div>
        <button onClick={createBlog} className="px-6 py-2 bg-red-100 rounded-xl border-0 font-bold">
          Нийтлэх
        </button>
      </div>
    </div>
  );
}
