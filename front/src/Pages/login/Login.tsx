import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import "./login.css"
import { URL } from "../../App";
import { AuthContext, type Soldier } from "../../context/AuthContext";

export default function Login() {
  const auth = useContext(AuthContext);
  const [personalNumber, setPersonalNumber] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [statusInput, setStatusInput] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch(`${URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ personalNumber, password }),
        credentials: "include"
      });

      const data = await res.json();
      auth?.setSoldier({"personalNumber": data.personal_number, "name": data.name, "role": data.role });
      if (data.personal_number) {
        setStatusInput("goodLogin");
        setMessage("Login successful!");
        if (data.role === "commander") {
          setTimeout(() => {
            navigate("/commander");
          }, 1000)
        } else {
          setTimeout(() => {
            navigate("/report_place");
          }, 1000)
        }
      } else {
        setMessage("Invalid name or password.");
        setStatusInput("errorLogin");
      }
    } catch (err) {
      setMessage("Network error: " + err);
    }
  }

  return (
    <>
      <div className="login">
        <h1 className="h1">ברוכים הבאים למערכת נכס"ל</h1>
        <h2 className="h2">התחברות</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input className="inputLogin" type="text" name="personalNumber" placeholder="מספר אישי" value={personalNumber} required onChange={(e) => setPersonalNumber(e.target.value)} />
          <input className="inputLogin" type="password" name="password" placeholder="סיסמא" value={password} required onChange={(e) => setPassword(e.target.value)} />
          <button className="btnLogin" type="submit">כניסה</button>
          <p className={statusInput}>{message}</p>
        </form>
      </div>
    </>
  );
}

