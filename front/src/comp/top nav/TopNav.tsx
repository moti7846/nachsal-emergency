import { Link } from "react-router";
import "./topNav.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
export default function TopNav() {
  const auth = useContext(AuthContext);

  return (
    <>
      <div className="nav-top">
        <Link to={"/"}>
          <img src="/IDF.png" alt="לוגו של צהל" className="logo-idf" />
        </Link>
        <h2 className="slogen-idf">מערכת נכס"ל צה"ל</h2>
        {auth?.soldier?.name ? (
          <div className="nav-actions">
            <Link to="/report_soldier_place">
              <button className="btnReport">טופס נכס"ל</button>
            </Link>
            <div className="user-section">
              <Link to="/logout">
                <img
                  className="account-img"
                  title="התנתק"
                  src="user-logout.png"
                  alt="התנתקות"
                />
              </Link>
              <p>{auth.soldier.name}</p>
            </div>
          </div>
        ) : (
          <div className="logo-idf"></div>
        )}
      </div>
    </>
  );
}
