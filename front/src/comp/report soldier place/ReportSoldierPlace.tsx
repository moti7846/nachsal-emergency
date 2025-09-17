// ReportSoldierPlace.tsx
import { useState, useContext } from "react";
import { addSoldierReport } from "../../api";
import { AuthContext } from "../../context/AuthContext";
import { Loader } from "@googlemaps/js-api-loader";
import "./reportSoldierPlace.css";

const API = "AIzaSyAt8qf1gUfAzXPOvKASVGfDM8gWnDF74dc"; // מפתח גוגל בלבד

type DataForm = { status: string; location: string };

export default function ReportSoldierPlace() {
  const auth = useContext(AuthContext);
  const soldierName = auth?.soldier?.name || "soldier";
  const [dataForm, setDataForm] = useState<DataForm>({
    status: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // reverse geocoding באמצעות Maps JavaScript API
  const geocodeLatLng = async (lat: number, lng: number) => {
    const loader = new Loader({
      apiKey: API,
      libraries: [],
      language: "he",
      region: "IL",
    });

    const google = await loader.load();
    const geocoder = new google.maps.Geocoder();

    return new Promise<string>((resolve, reject) => {
      geocoder.geocode(
        { location: { lat, lng } },
        (
          results: Array<typeof google.maps.GeocoderResult> | null,
          status: string
        ) => {
          if (status === "OK" && results?.[0]) {
            resolve(results[0].formatted_address);
          } else {
            reject(status);
          }
        }
      );
    });
  };

  const getLocation = () => {
    setErrorMsg("");
    if (!("geolocation" in navigator)) {
      setErrorMsg("הדפדפן לא תומך ב-Geolocation");
      return;
    }
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const addr = await geocodeLatLng(latitude, longitude);
          setDataForm((prev) => ({
            ...prev,
            location: addr || "לא נמצאה כתובת",
          }));
        } catch (e: any) {
          setErrorMsg("שגיאה מה-Geocoder: " + String(e));
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        const map: Record<number, string> = {
          1: "הרשאת מיקום נדחתה",
          2: "המיקום לא זמין כרגע",
          3: "תם הזמן לאיתור מיקום",
        };
        setErrorMsg(map[err.code] || "שגיאה בקבלת מיקום");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!auth?.soldier) {
      setErrorMsg("לא נמצאו פרטי חייל");
      return;
    }
    addSoldierReport({
      personal_number: auth.soldier.personalNumber,
      location: dataForm.location,
      status: dataForm.status,
    })
      .then(() => {
        setErrorMsg("");
        setDataForm({ status: "", location: "" });
      })
      .catch((err) => {
        setErrorMsg("שגיאה בשליחת הדיווח: " + err.message);
      });
  };

  return (
    <div className="Report_soldier_place">
      <form className="form-nachsal" onSubmit={handleSubmit}>
        <div className="tile">
          <h1>שלום {soldierName}</h1>
          <p>עדכן את מיקומך ומצבך</p>
        </div>

        <input className="status" type="text" placeholder="סטטוס" value={dataForm.status} onChange={(e) => setDataForm({ ...dataForm, status: e.target.value })} required />
        <input className="input-local" type="text" placeholder="מיקום" value={dataForm.location} onChange={(e) => setDataForm({ ...dataForm, location: e.target.value })} required />

        <div className="localtion">
          <button className="btn-local" type="button" onClick={getLocation} disabled={loading} >
            {loading ? "מאתר מיקום..." : "מיקום נוכחי"}
          </button>
        </div>

        <button className="btn-report" type="submit">דיווח</button>

        {errorMsg && <div className="error">{errorMsg}</div>}
      </form>
    </div>
  );
}
