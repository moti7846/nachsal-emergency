
import "./soldierPage.css"
import SoldierTable from "../../comp/soldier/SoldierTable";
import PersonalData from "../../comp/personalData/PersonalData"
export default function SoldierPage() {
  return (
    <>
      <PersonalData/>
      <SoldierTable />
    </>
  );
}
