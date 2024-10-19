"use client";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill"; 
import { CldUploadWidget } from "next-cloudinary";
import 'react-quill/dist/quill.snow.css';
import { Alert } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Edit() {
  const [id, setId] = useState(null);
  const [input, setInput] = useState({ title: "", description: "", blogImage: "" });
  const [alert, setAlert] = useState({ visible: false, message: "", severity: "" });
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const blogId = localStorage.getItem("blogId");
      setId(blogId);
    }
  }, []);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/blogs/get-blog/${id}`)
        .then((response) => {
          const data = response.data;
          setInput({ title: data.title, description: data.description, blogImage: data.blogImage });
        })
        .catch((error) => {
          console.error("Алдаа", error);
          setAlert({ visible: true, message: "Алдаа гарлаа", severity: "error" });
        });
    }
  }, [id]);

  const handleSubmit = () => {
    axios.put(`http://localhost:8000/blogs/get-blog/${id}`, input)
      .then((response) => {
        setAlert({ visible: true, message: "Амжилттай засагдлаа.", severity: "success" });
        router.push('/')
      })
      .catch((error) => {
        console.error("Алдаа гарлаа.", error);
        setAlert({ visible: true, message: "Алдаа гарлаа.", severity: "error" });
      });
  };

  return (
    <div className="flex flex-col w-full h-full bg-slate-100 justify-center items-center py-[40px]">
      <div className="flex flex-col bg-slate-50 p-6 rounded-xl gap-6">
        <p className="text-center font-bold text-[24px]">
          Нийтлэл засах
        </p>
        {alert.visible && (
          <Alert
            severity={alert.severity}
            onClose={() => setAlert({ ...alert, visible: false })}
          >
            {alert.message}
          </Alert>
        )}

        <div>
          <p className="font-bold">Гарчиг</p>
          <input
            value={input.title}
            onChange={(e) => setInput((prev) => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-2"
            placeholder="Гарчиг"
          />
        </div>
        <div>
          <p className="font-bold">Дэлгэрэнхий</p>
          <ReactQuill
            value={input.description}
            onChange={(content) => setInput((prev) => ({ ...prev, description: content }))}
          />
        </div>
        <div>
          <p className="font-bold">Зураг</p>
          <CldUploadWidget
            uploadPreset="uehrhnkw"
            onSuccess={(result, { widget }) => {
              setInput((prev) => ({
                ...prev,
                blogImage: result?.info?.secure_url,
              }));
              widget.close();
            }}
          >
            {({ open }) => (
              <button
                className="p-2 bg-slate-100 border rounded-xl"
                onClick={(e) => {
                  e.preventDefault();
                  open();
                }}
              >
                Зураг оруулах
              </button>
            )}
          </CldUploadWidget>
        </div>
        <button 
          className="px-6 py-2 bg-red-100 rounded-xl border-0 font-bold" 
          onClick={handleSubmit}
        >
          Засах
        </button>
      </div>
    </div>
  );
}
