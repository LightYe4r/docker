import { useEffect, useState } from "react";

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/attendance",
          {
            method: "GET",
            credentials: "include", // 쿠키를 서버로 전달하기 위해 필요
          }
        );

        if (response.ok) {
          const data = await response.json();
          setAttendanceData(data);
        } else {
          console.error("Failed to fetch attendance data");
        }
      } catch (error) {
        console.error("Error fetching attendance:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Attendance</h1>
      <p>지각: {attendanceData.지각}</p>
      <p>조퇴: {attendanceData.조퇴}</p>
      <p>출석: {attendanceData.출석}</p>
      <p>결석: {attendanceData.결석}</p>
    </div>
  );
};

export default Attendance;
