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
import { AlartContext } from "./context/AlartOnContext";
import { alertOnApi } from "./api";
import ChangePassword from "./Pages/changePassword/ChangePassword";

export const URL = "http://localhost:3000";

export default function App() {
  const [soldier, setSoldier] = useState<Soldier | null>(null);
  const [alert, setAlert] = useState<boolean>(false);
  let idInterval: number;
  const checkAuth = async () => {
    try {
      const res = await fetch(`${URL}/auth/me`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        idInterval = setInterval(async () => {
          const alertOn = await alertOnApi(data.personalNumber);
          setAlert(alertOn);
        }, 120 * 1000);
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
    return () => clearInterval(idInterval);
  }, []);
  return (
    <>
      <AlartContext.Provider value={{ alert, setAlert }}>
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
                <Route path="/Change_password" element={<ChangePassword />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
              </>
            )}
          </Routes>
        </AuthContext.Provider>
      </AlartContext.Provider>
    </>
  );
}
