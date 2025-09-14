
import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Report_place from "./comp/Report_place";
import Report_soldier_place from "./comp/Report_soldier_place";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report_soldier_place" element={<Report_soldier_place />} />
        <Route path="report_place" element={ <Report_place/>} />
        <Route path="/login" element={<Login />} />
      </Routes> 
    </div>
  )
}
