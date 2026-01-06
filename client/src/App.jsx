import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { SignUp, useAuth, useUser } from "@clerk/clerk-react";
import Layout from "./Layout";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home/Home";
import SignInPage from "./components/SignInPage";
import StudyHero from "./components/Study-Page/StudyHero";
import Hero from "./components/NotesPage/Hero";
import { api, setAuthTokenGetter } from "./api/axiosConfig";
import { useStudyStore } from "./app/studyStore";

const App = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const {userId} = useAuth()
  const {streak} = useStudyStore()
  // console.log('streak = ', streak);
  


  // 2️⃣ Sync user ONLY when Clerk is ready
  useEffect(() => {
    if (!isLoaded || !user) return;
    let highestStreak = Math.max(streak, 0)
    const handleSetUser = async () => {
      try {
        const res = await api.post("/set-user", {
          email: user.primaryEmailAddress?.emailAddress,
          name: user.fullName,
          profilePic: user.imageUrl,
          userId,
          streak,
          highestStreak
        });

        // console.log("User synced:", res.data);
      } catch (err) {
        console.error("User sync failed:", err.response?.data || err.message);
      }
    };

    handleSetUser();
  }, [isLoaded, user, streak]);

  return (
    <Layout>
      <Routes>
        {!isSignedIn ? (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup/*" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/signin" replace />} />
          </>
        ) : (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/notes" element={<Hero />} />
            <Route path="/study-log" element={<StudyHero />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </>
        )}
      </Routes>
    </Layout>
  );
};

export default App;
