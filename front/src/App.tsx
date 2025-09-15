
import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Report_place from "./comp/Report_place";
import Report_soldier_place from "./comp/Report_soldier_place";
import Headbar from "./comp/Headbar";
import Comoned_page from "./Pages/Comoned_page";

export default function App() {
  return (
    <>
      <Headbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report_soldier_place" element={<Report_soldier_place />} />
        <Route path="/comoned" element={<Comoned_page/>}/>
        <Route path="report_place" element={ <Report_place/>} />
        <Route path="/login" element={<Login />} />
      </Routes> 
    </>
  )
}
