import { useState } from "react";

const Checkin = ({ username }) => {
  const [message, setMessage] = useState("");
  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const seconds = currentTime.getSeconds().toString().padStart(2, "0");
  const timeString = `${hours}:${minutes}:${seconds}`;

  const handleCheckin = async () => {
    try {
      const response = await fetch("http://192.168.56.104:5000/checkin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          date: timeString,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error checking in:", error);
    }
  };

  return (
    <div>
      <h1>Checkin</h1>
      <div>
        <label>Name: {username}</label>
      </div>
      <div>
        <label>Time: {timeString}</label>
      </div>
      <button onClick={handleCheckin}>Checkin</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Checkin;
