import { Link } from "react-router";
import "./commanderPage.css"
import SoldierTable from "../../comp/soldier/SoldierTable";

export default function CommanderPage() {
  return (
    <>
      <SoldierTable />
      <div className="ReportsLinks">
        <Link to="/report_place"><button className="btnReport">טופס נכס"ל</button></Link>
      </div>
    </>
  );
}
