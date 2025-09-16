import { useContext } from "react";
import Report_place from "../../comp/report place/ReportPlace";
import Comoned_page from "../soldier/SoldierPage";
import Login from "../login/Login";
import { AuthContext } from "../../context/AuthContext";

export default function Home() {
  const auth = useContext(AuthContext);

  return (
    <main>
      {!auth?.soldier?.name && <Login />}
      {auth?.soldier?.name && auth?.soldier?.role === "commander" && <Comoned_page />}
      {auth?.soldier?.name && auth?.soldier?.role === "soldier" && <Report_place />}
    </main>
  );
}
