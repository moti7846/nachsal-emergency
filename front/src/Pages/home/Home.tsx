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
    } else if (!auth.soldier.password) {
      navigate("change_password");
    } else {
      navigate(`/soldier_page/${auth.soldier.personalNumber}`);
    }
  }, [auth, navigate]);

  return <main></main>;
}
