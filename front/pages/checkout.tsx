import { useEffect, useState } from "react";

const Checkout = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleCheckout = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/checkout",
          {
            method: "POST",
            credentials: "include", // 쿠키를 서버로 전달하기 위해 필요
          }
        );

        if (response.ok) {
          const data = await response.json();
          setMessage(data.message);
        } else {
          const errorData = await response.json();
          setMessage(errorData.message);
        }
      } catch (error) {
        console.error("Error checking out:", error);
      }
    };

    handleCheckout();
  }, []);

  return (
    <div>
      <h1>Checkout</h1>
      <p>{message}</p>
    </div>
  );
};

export default Checkout;
