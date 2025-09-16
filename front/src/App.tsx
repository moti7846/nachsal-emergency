import { Route, Routes } from "react-router";
import Home from "./Pages/home/Home";
import Login from "./Pages/login/Login";
import "./App.css";
import { useEffect, useState } from "react";
import { AuthContext, type Soldier } from "./context/AuthContext";
import ReportPlace from "./comp/report place/ReportPlace";
import ReportSoldierPlace from "./comp/report soldier place/ReportSoldierPlace";
import TopNav from "./comp/top nav/TopNav";

export const URL = "http://localhost:3000";

export default function App() {
  const [soldier, setSoldier] = useState<Soldier | null>(null);

  const checkAuth = async () => {
    try {
      const res = await fetch(`${URL}/auth/me`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setSoldier(data);
      } else {
        setSoldier(null);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      setSoldier(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <>
      <AuthContext.Provider
        value={{ soldier: soldier!, setSoldier: setSoldier }}
      >
        <TopNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/report_soldier_place"
            element={<ReportSoldierPlace />}
          />
          <Route path="report_place" element={<ReportPlace />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/soldier_page" element={<Soldier_page />} /> */}
        </Routes>
      </AuthContext.Provider>
    </>
  );
}
