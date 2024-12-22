import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePurchase = async () => {
      const courseId = "CTRL-S Course"; // Replace with the actual course ID

      // Redirect to the home page with a query parameter indicating success
      const timer = setTimeout(() => {
        navigate("/?paymentSuccess=true"); // Add query parameter to indicate success
      }, 2000); // Adjust the delay as needed

      return () => clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-green-100">
      <h1 className="text-2xl font-bold">Payment Successful!</h1>
      <p>You will be redirected to the homepage shortly.</p>
    </div>
  );
};

export default Success;
