"use client"
import { useEffect, useState } from "react";
import axios, { all } from "axios";
import { useParams } from "next/navigation";

const api = "http://localhost:8000/blogs";
export default function Detail() {
  let [data, setAllData] = useState([]);
  const params = useParams();
  let DetailApi = async (api) => {
    let receiver = await axios.get(
      `http://localhost:8000/blogs/get-blog/${params.id || ""}`
    );
    setAllData(receiver.data);
    console.log(receiver);
  };

  useEffect(() => {
    DetailApi(api);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center w-[800px] mt-[100px] mb-[40px]">
        <div>
          <div className="text-[#181A2A] text-4xl font-semibold font-sans ">
            {data.title}
          </div>
          <div className="flex   mt-[20px] items-center">
          Огноо: {formatDate(data.createdAt)}
          </div>
          <div className="flex flex-col gap-[32px]">
            <div className="w-[800px] h-[462px] mt-[32px]">
              <img
                className="w-[800px] h-[462px] rounded-[12px]"
                src={data?.blogImage}
                alt=""
              />
            </div>
            <div className="text-gray-500 ">{data.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}