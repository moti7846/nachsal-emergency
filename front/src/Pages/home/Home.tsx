import { useContext } from "react";
import Report_place from "../../comp/report place/ReportPlace";
import Login from "../login/Login";
import { AuthContext } from "../../context/AuthContext";
import "./home.css"
import SoldierPage from "../soldier/SoldierPage";
export default function Home() {
  const auth = useContext(AuthContext);

  return (
    <main>
      {!auth?.soldier?.name && <Login />}
      {auth?.soldier?.name && auth?.soldier?.role === "commander" && <SoldierPage />}
      {auth?.soldier?.name && auth?.soldier?.role === "soldier" && <Report_place />}
    </main>
  );
}
