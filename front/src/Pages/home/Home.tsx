import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./home.css";
import { useNavigate } from "react-router";

export default function Home() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!auth?.soldier?.name) {
      navigate("/login");
    }
    else if (auth?.soldier?.name && auth?.soldier?.role === "commander") {
      navigate(`/soldier_page/${auth.soldier.personalNumber}`)
    }
    else if (auth?.soldier?.name && auth?.soldier?.role === "soldier") {
      navigate("/report_place")
    }
  }, [auth, navigate]);

  return (
    <main>
    </main>
  );
}
