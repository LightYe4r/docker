import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // 기본 스타일 불러오기

export default function Welcome() {
  const [username, setUsername] = useState("");
  const [date, setDate] = useState(new Date());
  const [signInTimes, setSignInTimes] = useState({});
  const [signOutTimes, setSignOutTimes] = useState({});
  const minDate = new Date(2024, 0, 1); // 2024년 1월 1일

  useEffect(() => {
    // 로컬 스토리지에서 사용자 이름을 가져옵니다.
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername || "");
  }, []);

  const onChange = (newDate) => {
    setDate(newDate);
  };

  const handleSignIn = () => {
    const currentTime = new Date().toLocaleTimeString();
    setSignInTimes((prevTimes) => ({
      ...prevTimes,
      [date.toDateString()]: currentTime,
    }));
  };

  const handleSignOut = () => {
    // 퇴실 시간을 설정하고, 퇴실 버튼을 비활성화
    const currentTime = new Date().toLocaleTimeString();
    setSignOutTimes((prevTimes) => ({
      ...prevTimes,
      [date.toDateString()]: currentTime,
    }));
  };

  const isSignedIn = signInTimes[date.toDateString()];
  const isSignedOut = signOutTimes[date.toDateString()];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "white",
        color: "black",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <h1>안녕하세요, {username}님!</h1>
        <p>오늘의 날짜: {date.toDateString()}</p>
        <div style={{ marginTop: "20px" }}>
          <Calendar
            onChange={onChange}
            value={date}
            minDate={minDate}
            tileDisabled={({ date }) =>
              date.toDateString() !== new Date().toDateString()
            }
          />
        </div>
      </div>
      <div style={{ display: "flex", gap: "50px" }}>
        <button
          onClick={handleSignIn}
          disabled={isSignedIn}
          style={{
            padding: "10px 20px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
          }}
        >
          입실
        </button>
        <button
          onClick={handleSignOut}
          disabled={!isSignedIn || isSignedOut}
          style={{
            padding: "10px 20px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
          }}
        >
          퇴실
        </button>
      </div>
      {isSignedIn && <p>입실 시간: {signInTimes[date.toDateString()]}</p>}
      {isSignedOut && <p>퇴실 시간: {signOutTimes[date.toDateString()]}</p>}
    </div>
  );
}
