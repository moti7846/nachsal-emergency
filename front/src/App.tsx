import { Route, Routes } from "react-router";
import Home from "./Pages/home/Home";
import Login from "./Pages/login/Login";
import "./App.css";
import { useEffect, useState } from "react";
import { AuthContext, type Soldier } from "./context/AuthContext";
import ReportSoldierPlace from "./comp/report soldier place/ReportSoldierPlace";
import TopNav from "./comp/top nav/TopNav";
import Logout from "./Pages/logout/Logout";
import SoldierPage from "./Pages/soldier/SoldierPage";

export const URL = "https://nachsal-emergency.onrender.com";

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
      <AuthContext.Provider value={{ soldier, setSoldier }}>
        <TopNav />
        <Routes>
          {soldier ? (
            <>
              <Route path="/" element={<Home />} />
              <Route
                path={`/soldier_page/:personal_number`}
                element={<SoldierPage />}
              />
              <Route
                path="/report_soldier_place"
                element={<ReportSoldierPlace />}
              />
              <Route path="/logout" element={<Logout />} />{" "}
              <Route path="/login" element={<Login />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
        </Routes>
      </AuthContext.Provider>
    </>
  );
}
