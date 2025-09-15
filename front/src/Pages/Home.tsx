import Report_place from "../comp/Report_place";
import Comoned_page from "./Comoned_page";
import Login from "./Login";
import "./style/Home.css"

export default function Home() {
  return (
    <main >
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
    </main>
  );
}
