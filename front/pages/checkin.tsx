import { useEffect, useState } from "react";

const Checkin = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleCheckin = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/checkin",
          {
            method: "POST",
            credentials: "include", // 쿠키를 서버로 전달하기 위해 필요
          }
        );

        if (response.ok) {
          const data = await response.json();
          setMessage(data.message);
        } else {
          const errorData = await response.json();
          setMessage(errorData.message);
        }
      } catch (error) {
        console.error("Error checking in:", error);
      }
    };

    handleCheckin();
  }, []);

  return (
    <div>
      <h1>Checkin</h1>
      <p>{message}</p>
    </div>
  );
};

export default Checkin;
