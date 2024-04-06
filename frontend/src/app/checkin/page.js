"use client";
import React, { useEffect, useState, useContext } from "react";
import Calendar from "@/components/Calendar";
import AttenanceInfo from "@/components/AttenanceInfo";
import AttendButton from "@/components/AttendButton";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { UserContext } from "../providers";
const page = () => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    let id = localStorage.getItem("id");
    let name = localStorage.getItem("name");
    if (id & name) setUser({ id: id, name: name });
  }, []);

  function Logout() {
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    router.push("/");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-3">
        <p className="text-xl font-bold">반갑습니다 {user.name}님</p>

        <AttenanceInfo />
        <AttendButton />
        <Calendar />
        <p>로그아웃</p>
        <Button onClick={Logout}>로그아웃</Button>
      </div>
    </main>
  );
};

export default page;
