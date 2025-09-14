import Report_place from "../comp/Report_place";
import Comoned_page from "./Comoned_page";
import Login from "./Login";
import "./Home.css"

export default function Home() {
  return (
    <div className="page">
        {localStorage.getItem("isLoggedIn") === "true" ? (
          <>
            {localStorage.getItem("role") === "commend" ? (
              <Comoned_page />
            ) : (
              <Report_place />
            )}
          </>
        ) : (
          <>
            <h1>ברוכים הבאים למערכת נכס״ל</h1>
            <Login />
          </>
        )}
    </div>
  );
}
