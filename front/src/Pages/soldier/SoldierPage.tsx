import { Link, useParams } from "react-router";
import "./soldierPage.css";
import SoldierTable from "../../comp/soldier/SoldierTable";
import PersonalData from "../../comp/personalData/PersonalData";
export default function SoldierPage() {
  const params = useParams();
  return (
    <>
      <PersonalData paramsNumber={params.personal_number} />
      <SoldierTable paramsNumber={params.personal_number} />
      <div className="ReportsLinks">
        <Link to="/report_soldier_place">
          <button className="btnReport">טופס נכס"ל</button>
        </Link>
      </div>
    </>
  );
}
