"use client";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      setAuthToken(token);
    }
  }, []);

  return (
    <div className="flex px-10 py-4 items-center justify-between bg-slate-100">
      <Link href={"/"} className="font-bold text-[20px]">
        Нүүр
      </Link>
      <div className="flex items-center gap-[10px]">
        {authToken ? (
          <Link
            href={"/blog"}
            className="font-medium text-[14px] p-2 border rounded-xl"
          >
            + Нийтлэл бичих
          </Link>
        ) : null}
      {!authToken ? ( <Link href={"/signin"}>
       <AccountCircleIcon />
       </Link> ) : null}
      </div>
    </div>
  );
}
