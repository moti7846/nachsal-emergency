import { Link } from "react-router";
import Table from "../../comp/table/Table";
import "./commanderPage.css"

export default function CommanderPage() {
  return (
    <>
      <Table />
      <div className="ReportsLinks">
        <Link to="/report_place"><button className="btnReport">דיווח מיקום</button></Link>
        <Link to="/report_soldier_place"><button className="btnReport">שלח דיווח</button></Link>
      </div>
    </>
  );
}
