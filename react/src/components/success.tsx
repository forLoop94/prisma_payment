import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference"); // Get the reference from URL
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    if (!reference) {
      setStatus("No payment reference found.");
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/payments/verify-payment",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reference }),
          }
        );

        const result = await response.json();
        if (result.success) {
          setStatus("Payment verified successfully! 🎉");
        } else {
          setStatus("Payment verification failed. ❌");
        }
      } catch (error) {
        setStatus("Error verifying payment. Please contact support.");
      }
    };

    verifyPayment();
  }, [reference]);

  return (
    <div>
      <h2>{status}</h2>
      <a href="/">Go back to Home</a>
    </div>
  );
};

export default PaymentSuccess;
