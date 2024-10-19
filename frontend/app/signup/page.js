"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function SignUp() {
  const router = useRouter();
  const [input, setInput] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    repassword: "",
  });
  const [error, setError] = useState("");

  const signupHandler = async (e) => {
    e.preventDefault();

    if (input.password !== input.repassword) {
      setError("Нууц үг таарсангүй дахин оролдоно уу.");
      return;
    }

    const api = "http://localhost:8000/users";

    try {
      const res = await axios.post(api, { ...input });
      router.push("/signin");
    } catch (error) {
      setError("Invalid request");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen bg-slate-100 justify-center items-center">
      <div className="flex flex-col bg-slate-50 p-6 rounded-xl gap-6">
        <p className="text-center font-bold text-[24px]">Бүртгүүлэх</p>
        <div>
          <p className='font-bold'>Нэр</p>
          <input
            onChange={(e) => setInput((prev) => ({ ...prev, name: e.target.value }))}
            className="px-4 py-2"
            placeholder="Нэр"
          />
        </div>
        <div>
          <p className='font-bold'>И-мэйл хаяг</p>
          <input type="email"
            onChange={(e) => setInput((prev) => ({ ...prev, email: e.target.value }))}
            className="px-4 py-2"
            placeholder="И-мэйл хаяг"
          />
        </div>
        <div>
          <p className='font-bold'>Утасны дугаар</p>
          <input
            onChange={(e) => setInput((prev) => ({ ...prev, phoneNumber: e.target.value }))}
            className="px-4 py-2"
            placeholder="Утасны дугаар"
          />
        </div>
        <div>
          <p className='font-bold'>Нууц үг</p>
          <input
            type="password"
            onChange={(e) => setInput((prev) => ({ ...prev, password: e.target.value }))}
            className="px-4 py-2"
            placeholder="Нууц үг"
          />
        </div>
        <div>
          <p className='font-bold'>Нууц үг давтах</p>
          <input
            type="password"
            onChange={(e) => setInput((prev) => ({ ...prev, repassword: e.target.value }))}
            className="px-4 py-2"
            placeholder="Нууц үг давтах"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button onClick={signupHandler} className="px-6 py-2 bg-red-100 rounded-xl border-0 font-bold">
          Бүртгүүлэх
        </button>
      </div>
      <p className="mt-4">
        Хэрэв бүртгэлтэй бол
        <Link href={"/signin"} className="underline font-bold">
          Нэвтрэх
        </Link>
      </p>
    </div>
  );
}
