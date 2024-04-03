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

  //   async function getAttendInfo() {
  //     let username = localStorage.getItem("name");
  //     let userid = localStorage.getItem("id");
  //     setId(userid);
  //     setName(username);
  //     const userInfo = {
  //       id: userid,
  //       name: username,
  //     };
  //     try {
  //       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/attendance`, {
  //         method: "POST",
  //         body: JSON.stringify(userInfo),
  //         headers: {
  //           "content-type": "application/json",
  //         },
  //       });
  //       if (res.ok) {
  //         const aInfo = await res.json();
  //         setAttendInfo(aInfo);
  //         console.log(aInfo);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   useEffect(() => {
  //     getAttendInfo();
  //   }, []);
  useEffect(() => {
    async function getAttendInfo() {
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
        className="dark mt-5 mb-5"
      >
        <TableHeader>
          <TableColumn>출석</TableColumn>
          <TableColumn>지각</TableColumn>
          <TableColumn>조퇴</TableColumn>
          <TableColumn>결석</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>{attendInfo.출석}</TableCell>
            <TableCell>{attendInfo.지각}</TableCell>
            <TableCell>{attendInfo.조퇴}</TableCell>
            <TableCell>{attendInfo.결석}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default AttenanceInfo;
