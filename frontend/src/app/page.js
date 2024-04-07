"use client";
import {
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
} from "@nextui-org/react";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "./providers";

export default function Home() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { setUser } = useContext(UserContext);

  async function handleSubmit() {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("password", password);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        // 로그인 성공 시, localstorage에 사용자 정보 저장
        localStorage.setItem("id", data.id);
        localStorage.setItem("name", data.name);
        // 로그인 성공 시, attendance 페이지로 이동
        setUser({ id: data.id, name: data.name });
        router.push("/checkin");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card className="min-w-[360px]">
        <CardHeader className="flex gap-3 item-center">
          <h1>로그인</h1>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-3">
          <p>사용자명</p>
          <Input
            type="text"
            laebl="사용자명"
            placeholder="사용자명을 입력해주세요."
            onChange={(e) => setName(e.target.value)}
          />
          <p>비밀번호</p>
          <Input
            type="password"
            laebl="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            onChange={(e) => setPassword(e.target.value)}
          />
        </CardBody>
        <Divider />
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" onClick={handleSubmit}>
            로그인
          </Button>
          {message && <p>{message}</p>}
        </CardFooter>
      </Card>
    </main>
  );
}
