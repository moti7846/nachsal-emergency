import { useState } from "react";
import "./reportSoldierPlace.css";
// import { config } from "dotenv";
// config()

const API = import.meta.env.VITE_API_KEY


type DataForm = {
  status: string;
  location: string;
};

export default function ReportSoldierPlace() {
  const [dataForm, setDataForm] = useState<DataForm>({
    status: "",
    location: "",
  });
  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // כאן יש לך את הקואורדינטות
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          console.log(`Latitude: ${lat}, Longitude: ${lon}`);
          console.log(API)
        //   getAdders(
        //     `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${API}`
        //     // `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
        //   );
        },
        (error) => {
          console.error("שגיאה בקבלת מיקום:", error);
        }
      );
    } else {
      alert("הדפדפן לא תומך ב-Geolocation");
    }
  };
  // const getAdders = async (url: string) => {
  //   const res = await (await fetch(url)).json();
  //   console.log(res.display_name);
  // };
  return (
    <>
      <div className="Report_soldier_place">
        <div className="form-nachsal">
          <div className="tile">
            <h1>שלום (שם חייל)</h1>
            <p>נא הכנס בדחיפות את מיקומך ומצבך</p>
          </div>
          <input
            className="status"
            type="text"
            placeholder="סטטוס"
            value={dataForm.status}
            onChange={(e) =>
              setDataForm({ ...dataForm, status: e.target.value })
            }
          />
          <input
            className="input-local"
            type="text"
            placeholder="מיקום"
            value={dataForm.location}
            onChange={(e) =>
              setDataForm({ ...dataForm, location: e.target.value })
            }
          />
          <div className="localtion">
            <div className="btn-local" onClick={getLocation}>
              שלח מיקום
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
