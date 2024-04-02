// pages/api/login.js

import mysql from "mysql";

export default function handler(req, res) {
  // MySQL 연결 설정
  const connection = mysql.createConnection({
    host: "192.168.56.104:3306",
    user: "student",
    password: "docker",
    database: "docker",
  });

  // MySQL 연결
  connection.connect();

  // 사용자가 제출한 로그인 정보
  const { username, password } = req.body;

  // MySQL에서 사용자 인증 쿼리 실행
  connection.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        // 로그인 성공
        res.status(200).json({ message: "로그인 성공" });
      } else {
        // 로그인 실패
        res.status(401).json({ message: "로그인 실패" });
      }
    }
  );

  // MySQL 연결 종료
  connection.end();
}
