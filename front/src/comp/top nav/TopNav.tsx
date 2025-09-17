import { Link } from "react-router";
import "./topNav.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
export default function TopNav() {
  const auth = useContext(AuthContext);
  
  return (
    <>
      <div className="nav-top">
        <Link to={"/"}><img src="/IDF.png" alt="לוגו של צהל" className="logo-idf" /></Link>
        <h2 className="slogen-idf">מערכת נכס"ל צה"ל</h2>
        {auth?.soldier?.name ?
          <Link to={'logout'}>
            <img className="account-img" title="התנתק" src="account.png" alt="אייקון חשבון" />
          </Link> : 
          <div className="logo-idf">
        </div>}
      </div>
    </>
  );
}
