import Link from "next/link";

export default function Home() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <style jsx global>{`
        body {
          background-color: white;
          color: black;
        }
      `}</style>

      <div>
        <h1>AWS cloud school attendance</h1>
        <p>
          로그인하려면
          <Link href="/login">
            <span style={{ color: "blue", cursor: "pointer" }}> 여기</span>
          </Link>
          를 클릭하세요 :)
        </p>
      </div>
    </div>
  );
}
