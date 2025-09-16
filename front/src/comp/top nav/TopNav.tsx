import { Link } from "react-router";
import "./topNav.css";
export default function TopNav() {
  return (
    <>
      <div className="nav-top">
        <img src="/IDF.png" alt="לוגו של צהל" className="logo-idf" />
        <h2 className="slogen-idf">מערכת נכס"ל צה"ל</h2>
        <Link to={'logout'}><img title="התנתק" className="account-img" src="account.png" alt="אייקון חשבון" /></Link>
      </div>
    </>
  );
}
