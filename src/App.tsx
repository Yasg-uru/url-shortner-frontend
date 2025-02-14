import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/loginpage";
import ProtectedRoute from "./helper/protectedRoute";
import CreateUrl from "./components/shorten/createurl";

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
          <Route path="/login" element={<Login/>} />
        </Route>
      <Route element={<ProtectedRoute />}>
          <Route path="/login" element={<Login/>} />
        </Route>
      <Route element={<ProtectedRoute />}>
          <Route path="/shorten" element={<CreateUrl/>} />
        </Route>
    </Routes>
  );
}

export default App;
