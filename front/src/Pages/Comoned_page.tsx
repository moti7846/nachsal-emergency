import { Link } from "react-router";

export default function Comoned_page() {
  return (
    <>
      <main>
        <Table />
        <Link to="/report_place">
          <div>דיווח מיקום</div>
        </Link>
        <Link to="/report_soldier_place">
          <div>דיווח מיקום של חייל</div>
        </Link>
      </main>
    </>
  );
}
