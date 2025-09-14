
import { useState } from "react";
import { useNavigate } from "react-router";
import "./Login.css"

export default function Login() {
const [privateNumber, setprivateNumber] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const nav = useNavigate();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ privateNumber, password }),
      });
      const result = await res.json();
      if (result.success) {
        setMessage("Login successful!");
        localStorage.setItem("isLoggedIn", "true");
        setTimeout(() => {
          window.location.reload();
        }, 100);
        if (result.role === "commend") {
          localStorage.setItem("role", "commend");
          nav("/commend");
        } else {
          localStorage.setItem("role", "soldier");
          nav("/report_place");
        }
      } else {
        setMessage("Invalid name or password.");
      }
    } catch (err) {
      setMessage("Network error: " + err);
    }
  }
  return (
    <>
      <main className="page">
        <div className="login">
          <h1>התחברות</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="string"
                name="privateNumber"
                placeholder="מספר אישי"
                value={privateNumber}
                required
                onChange={(e) => setprivateNumber(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="סיסמא"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">כניסה</button>
          </form>
        </div>
      </main>
      <p>{message}</p>
    </>
  );
}
