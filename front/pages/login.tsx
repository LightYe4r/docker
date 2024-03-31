import Link from "next/link"; // Link 컴포넌트 import
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    // 비밀번호가 비어 있는지 확인하고 비어 있다면 거부
    if (!password) {
      setErrorMessage("비밀번호를 입력하세요.");
      return;
    }

    // 여기서는 간단하게 username을 localStorage에 저장하고, 실제 인증 로직은 생략하겠습니다.
    localStorage.setItem("username", username);
    router.push("/welcome"); // 로그인 후 환영 페이지로 이동
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "black",
        textAlign: "center",
      }}
    >
      <div
        style={{
          border: "2px solid black",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <h1>
          ACS Attendance <br />
          Login Page
        </h1>
        <div>
          <label>
            사용자 이름:{" "}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid black",
                borderRadius: "4px",
                padding: "10px",
                margin: "5px 0",
                width: "200px",
                boxSizing: "border-box",
              }}
            />
          </label>
        </div>
        <div>
          <label>
            비밀번호:{" "}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid black",
                borderRadius: "4px",
                padding: "10px",
                margin: "5px 0",
                width: "200px",
                boxSizing: "border-box",
              }}
            />
          </label>
          <p style={{ color: "red" }}>{errorMessage}</p>
        </div>
        <button
          onClick={handleLogin}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          로그인
        </button>
      </div>
    </div>
  );
}
