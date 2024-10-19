"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios"

export default function SignIn() {

    const [input , setInput] = useState({
        email:"",
        password:"",
      })
      const [error , setError] = useState("")
      const router = useRouter()
      const api = "http://localhost:8000/users/user"
      
      const loginHandler = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post(api, { ...input });
          console.log(res.data);
          const token = res.data.token;
          localStorage.setItem('authToken', token);  
          router.push("/");
        } catch (error) {
          setError(error.response?.data?.message || "Invalid request");
        }
      }
      
      

  return (
    <div className="flex flex-col w-full h-screen bg-slate-100 justify-center items-center">
      <div className="flex flex-col bg-slate-50 p-6 rounded-xl gap-6">
        <p className="text-center font-bold text-[24px]">Нэвтрэх</p>
        <div>
          <p className='font-bold'>И-мэйл хаяг</p>
          <input  onChange={(e) => setInput((prev) => ({ ...prev, email: e.target.value }))} className="px-4 py-2" placeholder="И-мэйл хаяг"></input>
        </div>
        <div>
          <p className='font-bold'>Нууц үг</p>
          <input type="password" onChange={(e) => setInput((prev) => ({ ...prev, password: e.target.value }))} className="px-4 py-2" placeholder="Нууц үг"></input>
        </div>
        <button onClick={loginHandler} className="px-6 py-2 bg-red-100 rounded-xl border-0 font-bold">
          Нэвтрэх
        </button>
      </div>

      <p className="mt-4">
        Хэрэв бүртгэлгүй бол
        <Link href={"/signup"} className="underline font-bold">
          Бүртгүүлэх
        </Link>
      </p>
    </div>
  );
}
