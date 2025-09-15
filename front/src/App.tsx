import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Report_place from "./comp/Report_place";
import Report_soldier_place from "./comp/Report_soldier_place";
import Headbar from "./comp/Headbar";
import Comoned_page from "./Pages/Comoned_page";
import "./App.css"
import { useEffect, useState } from "react";
import { AuthContext, type Soldier } from "./context/authContext";

export const URL = "http://localhost:3000";

export default function App() {
  const [soldier, setSoldier] = useState<Soldier | null>(null);

  const checkAuth = async () => {
    try {
      const res = await fetch(`${URL}/me`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setSoldier(data);
      } else {
        setSoldier(null);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      setSoldier(null);
    };
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ soldier, setSoldier }}>
        <Headbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report_soldier_place" element={<Report_soldier_place />} />
          <Route path="/comoned" element={<Comoned_page />} />
          <Route path="report_place" element={<Report_place />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthContext.Provider>

    </>
  )
}
