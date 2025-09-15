import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Report_place from "./comp/Report_place";
import Headbar from "./comp/Headbar";
import Comoned_page from "./Pages/Comoned_page";
import "./App.css"
import Solider_page from "./Pages/Solider_page";


export const URL = "http://localhost:3000"



export default function App() {
  return (
    <>
      <Headbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comoned" element={<Comoned_page/>}/>
        <Route path="report_place" element={ <Report_place/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/report/:personalNumber" element={<Solider_page/>}/>
      </Routes> 
    </>
  )
}
