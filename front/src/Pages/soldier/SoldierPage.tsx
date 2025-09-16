import { Link } from "react-router";
import "./soldierPage.css"
import SoldierTable from "../../comp/soldier/SoldierTable";
import SoldierData from "../../comp/personalData/Soldier";

export default function SoldierPage() {
  return (
    <>
      <SoldierData/>
      <SoldierTable />
      <div className="ReportsLinks">
        <Link to="/report_place"><button className="btnReport">טופס נכס"ל</button></Link>
      </div>
    </>
  );
}
