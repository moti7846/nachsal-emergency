import "./soldierPage.css"

import SoldierTable from "../../comp/soldier/SoldierTable";
import PersonalData from "../../comp/personalData/PersonalData";
export default function SoldierPage() {
  const params = useParams();
  return (
    <>
      <PersonalData paramsNumber={params.personal_number} />
      <SoldierTable paramsNumber={params.personal_number} />
    </>
  );
}
