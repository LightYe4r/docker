"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";

const AttendButton = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState(null);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    async function getTodayStatus() {
      let username = localStorage.getItem("name");
      let userid = localStorage.getItem("id");
      setId(userid);
      setName(username);
      const userInfo = {
        id: userid,
        name: username,
      };
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/checkstatus`,
          {
            method: "POST",
            body: JSON.stringify(userInfo),
            headers: {
              "content-type": "application/json",
            },
          }
        );
        if (res.ok) {
          const aInfo = await res.json();
          setStatus(aInfo.status);
          //console.log(aInfo);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getTodayStatus();
  }, []);
  async function Attend() {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    const userInfo = {
      id: id,
      name: name,
      date: formattedDate,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkin`, {
        method: "POST",
        body: JSON.stringify(userInfo),
        headers: {
          "content-type": "application/json",
        },
      });
      if (res.ok) {
        alert("출석이 되었습니다!");
        //console.log("출석");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function Leave() {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    const userInfo = {
      id: id,
      name: name,
      date: formattedDate,
    };
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        method: "POST",
        body: JSON.stringify(userInfo),
        headers: {
          "content-type": "application/json",
        },
      });
      if (res.ok) {
        alert("오늘 하루 고생하셨습니다!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      {status == true ? (
        <>
          <p>퇴실 등록</p>
          <Button className="dark" onClick={Leave}>
            퇴실
          </Button>
        </>
      ) : (
        <>
          <p>입실 등록</p>
          <Button className="dark" onClick={Attend}>
            입실
          </Button>
        </>
      )}
    </div>
  );
};

export default AttendButton;
