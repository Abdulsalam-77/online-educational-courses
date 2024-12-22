import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";

const stripePromise = loadStripe(
  "pk_test_51QFT2uDsfkJdeFG0y2nD4ohx5LZeilJEJrUixexlAB3hrMoerL0ARJ6xB4ZwvH1NOf2pz9Hcq9Wt10h0Xa8vc2lD00LDzQL8r4"
);

// Helper function to determine the API URL based on environment
const getApiUrl = () => {
  // Use localhost for local development
  if (window.location.hostname === "localhost") {
    return "http://localhost:4000/api/create-checkout-session";
  }
  // Use Vercel backend URL for production
  return "https://it101-website.vercel.app/api/create-checkout-session";
};

const PurchaseButton = ({ courseId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    setIsLoading(true);
    const stripe = await stripePromise;
  };

  return (
    <button
      onClick={handlePurchase}
      disabled={isLoading}
      className={`inline-flex items-center bg-[#47AAB1] border-0 py-1 px-3 focus:outline-none hover:bg-[#68A8C2] rounded text-lg font-bold mt-4 lg:mt-0 ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {isLoading ? "Processing..." : "Purchase Course"}
    </button>
  );
};

export default PurchaseButton;
