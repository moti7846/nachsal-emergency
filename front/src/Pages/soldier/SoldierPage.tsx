import "./soldierPage.css"
import SoldierTable from "../../comp/soldier/SoldierTable";
import PersonalData from "../../comp/personalData/PersonalData";
import { useParams } from "react-router";
import { useContext } from "react";
import { AlartContext } from "../../context/AlartOnContext";
export default function SoldierPage() {
  const {alert} = useContext(AlartContext)!
  console.log(alert)
  const params = useParams();
  
  return (
    <>
      <PersonalData paramsNumber={params.personal_number} />
      <SoldierTable paramsNumber={params.personal_number} />
    </>
  );
}
