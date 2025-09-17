import { useContext, useEffect, useState } from "react";
import { sendNechsal } from "../../api";
import { AuthContext } from "../../context/AuthContext";

export default function AlertOn() {
    const [progress, setProgress] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const auth = useContext(AuthContext);
    const duration = 30 * 60 * 1000; // משך הזמן הרצוי בדקות


    const nechsal = async () => {
        const res = await sendNechsal(String(auth?.soldier?.personalNumber))
    }
    useEffect(() => {
        let interval: number;
        nechsal()
        if (isRunning && auth?.soldier) {
            setProgress(0); // לאתחל בכל התחלה
            const startTime = Date.now();
            interval = setInterval(() => {
                const elapsed = Date.now() - startTime; // כמה זמן עבר
                const percent = Math.min((elapsed / duration) * 100, 100);
                setProgress(percent);

                if (percent >= 100) {
                    clearInterval(interval);
                    setIsRunning(false);
                }
            }, 1000); // עדכון כל שניה
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    //כמה דקות עברו
    const elapsedMinutes = Math.round((progress / 100) * 30);

    return (
        <div style={{ width: "300px" }}>
            <button onClick={() => setIsRunning(true)}>הפעל נוהל נכס"ל</button>
            <div
                style={{
                    marginTop: "10px",
                    height: "20px",
                    width: "100%",
                    backgroundColor: "#ddd",
                    borderRadius: "10px",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        height: "100%",
                        width: `${progress}%`,
                        backgroundColor: "#4caf50",
                        transition: "width 0.1s linear",
                    }}
                />
            </div>

            <p>{elapsedMinutes} / 30 דקות</p>
        </div>
    )
}
