import { Link } from "react-router";
import "./soldierPage.css"
import SoldierTable from "../../comp/soldier/SoldierTable";
import PersonalData from "../../comp/personalData/PersonalData"
export default function SoldierPage() {
  return (
    <>
      <PersonalData/>
      <SoldierTable />
      <div className="ReportsLinks">
        <Link to="/report_place"><button className="btnReport">טופס נכס"ל</button></Link>
      </div>
    </>
  );
}
