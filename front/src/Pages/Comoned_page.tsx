import { Link } from "react-router";
import Table from "../comp/Table";
import "./Comoned_page.css"



export default function Comoned_page() {
  return (
    <>
      <main className="page">
        <div className="containerCommender">
          <Table />
        </div>
        <div className="links">
          <Link to="/report_place">
            דיווח מיקום
          </Link>
          <Link to="/report_soldier_place">
            שלח דיווח
          </Link>
        </div>
      </main>
    </>
  );
}
