// src/App.js
import React, { useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import wave from "./assets/wave5.png";
import waveRotate from "./assets/wave5Rotate.png";
import AuthForm from "./Components/AuthForm";
import Cancel from "./Components/Cancel";
import CourseOverview from "./Components/CourseOverview";
import CTA from "./Components/CTA";
import HeroSection from "./Components/HeroSection";
import Introduction from "./Components/Introduction";
import Navbar from "./Components/Navbar";
import Success from "./Components/Success";
import Team from "./Components/Team";
import UnlockedSections from "./Components/UnlockedSections";

function App() {
  const introRef = useRef(null);
  const [introHeight, setIntroHeight] = useState(0);
  const [showUnlockedSections, setShowUnlockedSections] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (introRef.current) {
      setIntroHeight(introRef.current.offsetHeight);
    }

    // Fetch purchase status from Firestore
    const fetchPurchaseStatus = async () => {};

    fetchPurchaseStatus();
  }, [introHeight, location]);

  return (
    <div className="flex flex-col">
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <div
                className="bg-cover bg-right"
                style={{
                  backgroundImage: `url(${wave})`,
                  backgroundSize: "cover",
                }}
              >
                <div className="min-h-screen">
                  <Navbar introHeight={introHeight} />
                  <HeroSection />
                </div>
                <section id="introduction" ref={introRef}>
                  <Introduction />
                </section>
              </div>
              <div
                className="bg-cover bg-left"
                style={{
                  backgroundImage: `url(${waveRotate})`,
                  backgroundSize: "cover",
                }}
              >
                <section id="course-overview">
                  <CourseOverview />
                </section>
                <section id="our-team">
                  <Team />
                </section>
                <section id="call-to-action">
                  <CTA />
                </section>
                {/* Render UnlockedSections at the bottom of the page */}
                {showUnlockedSections && (
                  <section id="unlocked-sections">
                    <UnlockedSections />
                  </section>
                )}
              </div>
            </div>
          }
        />
        <Route
          path="/auth"
          element={
            <div
              className="bg-cover bg-right h-screen"
              style={{
                backgroundImage: `url(${wave})`,
                backgroundSize: "cover",
              }}
            >
              <AuthForm />
            </div>
          }
        />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </div>
  );
}

export default App;
