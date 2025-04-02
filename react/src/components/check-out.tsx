import { useState } from "react";

const CheckoutButton = () => {
  const [loading, setLoading] = useState(false);

  const processPayment = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [
            { id: "603a2ac7-98e6-44c2-9d0b-c19645d33d26", quantity: 3 },
            { id: "98b84015-52c0-4751-8878-eaef46e21541", quantity: 1 },
          ],
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      const { url } = await res.json();
      window.location.href = url;
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={processPayment} disabled={loading}>
      {loading ? "Processing..." : "Pay Now"}
    </button>
  );
};

export default CheckoutButton;
