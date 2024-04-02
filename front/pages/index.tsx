import { useState, useEffect } from "react";
import Link from "next/link";

const Home = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Flask 서버로 요청을 보내는 함수
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.56.104:5000/");
        const data = await response.text();
        setMessage(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>This is Home!</h1>
      <p>Message from Flask server: {message}</p>
      {/* 로그인 페이지로 이동하는 링크 추가 */}
      <Link href="/login">Go to Login</Link>
    </div>
  );
};

export default Home;
