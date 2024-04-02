import { useEffect } from "react";
import { useRouter } from "next/router";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    // 로그아웃 처리
    const handleLogout = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/logout",
          {
            method: "GET",
            credentials: "include", // 쿠키를 서버로 전달하기 위해 필요
          }
        );

        if (response.ok) {
          router.push("/"); // 로그아웃 성공 시 홈페이지로 이동
        } else {
          console.error("Failed to logout");
        }
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };

    handleLogout();
  }, [router]);

  return null; // 로그아웃 중일 때는 아무것도 렌더링하지 않음
};

export default Logout;
