import { Alert } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const api = "http://localhost:8000/blogs";
function Blogs() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [authToken, setAuthToken] = useState(null);
  const [alert, setAlert] = useState({
    message: "",
    severity: "",
    visible: false,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      setAuthToken(token);
    }
  }, []);

  const callData = async (api, page = 1, limit = 3) => {
    try {
      const response = await axios.get(`${api}?page=${page}&limit=${limit}`);
      const fetchedData = response.data.data;

      if (fetchedData.length > 0) {
        setData((allData) => [...allData, ...fetchedData]);
      }
      if (fetchedData.length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    callData(api, page);
  }, [page]);

  const handler = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const deleteBlog = async (id) => {
    try {
      const res = await axios.delete(`${api}/${id}`);
      console.log("Blog deleted successfully:", res.data);
      setAlert({
        message: "Амжилттай устгалаа.",
        severity: "success",
        visible: true,
      });
    } catch (error) {
      console.error(
        "Error deleting blog:",
        error.response?.data || error.message
      );
      setAlert({
        message: "Устгаж чадсангүй.",
        severity: "success",
        visible: true,
      });
    }
  };

  const editPage = (id) => {
   localStorage.setItem("blogId" , id)
    router.push(`/edit`);
  }

  const truncateDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 10) {
      return words.slice(0, 10).join(" ") + "...";
    }
    return description;
  };

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

  const router = useRouter();
  const singlePost = (id) => {
    router.push(`/${id}`);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10">
         {alert.visible && (
              <Alert
                severity={alert.severity}
                onClose={() => setAlert({ ...alert, visible: false })}
              >
                {alert.message}
              </Alert>
            )}
      <div className="flex flex-wrap gap-4 max-w-5xl justify-center">
        {data.map((el, index) => (
          <div
            key={index}
            className="flex flex-col border border-neutral-300 rounded-lg w-[330px]"
          >
            <div className="flex gap-[12px] p-4 flex-col">
              <div
                className="h-40 rounded-lg bg-cover"
                style={{
                  backgroundImage: `url(${el.blogImage})`,
                }}
                onClick={() => singlePost(el._id)}
              ></div>
              <div className="flex flex-col gap-[12px]">
                <p className=" w-fit p-1 rounded-lg text-blue-700 font-bold font-sans flex ga-[6px] justify-center items-center">
                  {el.title}
                </p>
                <p className="text-black font-sans font-semibold">
                  {truncateDescription(el.description)}
                </p>
                <div className="text-gray-400 font-normal font-sans flex gap-[32px]">
                  Огноо: {formatDate(el.createdAt)}
                </div>
              </div>
            </div>
            {authToken ? (
              <div className="flex justify-between p-4">
                <button onClick={() => editPage(el._id)} className="border p-2 rounded-xl">Засах</button>
                <button
                  onClick={() => deleteBlog(el._id)}
                  className="border p-2 rounded-xl"
                >
                  Устгах
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
      {hasMore ? (
        <button
          onClick={handler}
          className="w-[100px] h-[40px] text-gray-500 border rounded-lg"
        >
          Цааш үзэх
        </button>
      ) : (
        <p className="text-gray-500">Бүх өгөгдөл ачаалагдлаа</p>
      )}
    </div>
  );
}

export default Blogs;
