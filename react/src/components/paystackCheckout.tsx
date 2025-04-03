import { useState } from "react";

const PayButton = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: "603a2ac7-98e6-44c2-9d0b-c19645d33d26",
          email: "customer@example.com",
        }),
      });

      if (!response.ok) {
        throw new Error("Payment initialization failed");
      }

      const { authorizationUrl } = await response.json();
      window.location.href = authorizationUrl; // Redirect to Paystack checkout
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handlePayment} disabled={loading}>
      {loading ? "Processing..." : "Pay with Paystack"}
    </button>
  );
};

export default PayButton;
