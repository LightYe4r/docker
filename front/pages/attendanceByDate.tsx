// pages/api/attendance/date.js
export default async function handler(req, res) {
  if (req.method === "POST") {
    // 필요한 요청 데이터 처리
    const { date } = req.body;

    // 세션에서 사용자 ID 가져오기 등의 필요한 로직 추가

    // 일자별 출결 조회 요청 처리
    const response = await fetch("http://192.168.56.104/attendance/date", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date }),
    });
    const data = await response.json();

    res.status(response.status).json(data);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
