import Report_place from "../comp/report place/ReportPlace";
import Command_page from "./commander page/CommanderPage";
import Login from "./login/Login";
import "./style/Home.css"

export default function Home() {
  return (
    <main >
        {localStorage.getItem("isLoggedIn") === "true" ? (
          <>
            {localStorage.getItem("role") === "commend" ? (
              <Command_page />
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
