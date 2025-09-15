import { Link } from "react-router";
import Table from "../comp/Table";
import "./style/Comoned_page.css"

export default function Comoned_page() {
  return (
    <>
      <div className="containerCommender">
        <Table personalNumber="2001" />
      </div>
      <div className="links">
        <Link to="/report_place">
          דיווח מיקום
        </Link>
        <Link to="/report_soldier_place">
          שלח דיווח
        </Link>
      </div>
    </>
  );
}
