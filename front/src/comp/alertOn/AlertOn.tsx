import { useContext, useEffect, useState } from "react";
import { sendNechsal } from "../../api";
import { AuthContext } from "../../context/AuthContext";
import "./AlertOn.css"; // ייבוא הקובץ CSS

export default function AlertOn() {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const auth = useContext(AuthContext);
  const duration = 30 * 60 * 1000; // משך הזמן הרצוי בדקות

  const nechsal = async () => {
    if (!auth?.soldier?.personalNumber) return;
    try {
      const res = await sendNechsal(String(auth.soldier.personalNumber));
      console.log("Nachsal sent:", res);
    } catch (err) {
      console.error("Error sending nechsal:", err);
    }
  };

  useEffect(() => {
    let interval: number;

    if (isRunning && auth?.soldier) {
      nechsal();
      setProgress(0); // אתחול בהתחלה
      const startTime = Date.now();

      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const percent = Math.min((elapsed / duration) * 100, 100);
        setProgress(percent);

        if (percent >= 100) {
          clearInterval(interval);
          setIsRunning(false);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, auth?.soldier]);

  const elapsedMinutes = Math.round((progress / 100) * 30);

  return (
    <div className="alert-on-container">
      <button className="alert-on-button" onClick={() => setIsRunning(true)}>
        הפעל נוהל נכס"ל
      </button>

      <div className="alert-on-progress-bar">
        <div
          className="alert-on-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="alert-on-text">{elapsedMinutes} / 30 דקות</p>
    </div>
  );
}
