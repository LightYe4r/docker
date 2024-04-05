"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

const AttenanceInfo = () => {
  const [attendInfo, setAttendInfo] = useState({});
  const [id, setId] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("name");
    const userid = localStorage.getItem("id");
    setId(userid);
    setName(username);

    async function getAttendInfo() {
      const userInfo = {
        id: userid,
        name: username,
      };
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/attendance`,
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
          setAttendInfo(aInfo);
          console.log(aInfo);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getAttendInfo();
  }, []);

  return (
    <>
      <Table
        removeWrapper
        aria-label="attendance table"
        className=" mt-5 mb-5 "
      >
        <TableHeader>
          <TableColumn className="text-center border">출석</TableColumn>
          <TableColumn className="text-center border">지각</TableColumn>
          <TableColumn className="text-center border">조퇴</TableColumn>
          <TableColumn className="text-center border">결석</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell className="text-center border border-gray-400 bg-slate-200">
              {attendInfo.출석}
            </TableCell>
            <TableCell className="text-center border border-gray-400 bg-slate-200">
              {attendInfo.지각}
            </TableCell>
            <TableCell className="text-center border border-gray-400 bg-slate-200">
              {attendInfo.조퇴}
            </TableCell>
            <TableCell className="text-center border border-gray-400 bg-slate-200">
              {attendInfo.결석}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default AttenanceInfo;
