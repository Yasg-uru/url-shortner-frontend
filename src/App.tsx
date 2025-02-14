import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/loginpage";
import ProtectedRoute from "./helper/protectedRoute";
import CreateUrl from "./components/shorten/homepage";
import Navbar from "./components/navbar";
import TopicAnalytics from "./components/shorten/topic-analysis";
import OverallAnalytics from "./components/shorten/overall";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/shorten" element={<CreateUrl />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/topic" element={<TopicAnalytics />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/overall" element={<OverallAnalytics />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
