import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getSoldierDetails } from "../../api";
import "./personalData.css";
import { useParams } from "react-router";
import "./personalData.css";

export type PersonalData = {
  personal_number: number;
  name: string;
  role: string;
  commander: number;
  address: string;
  phone: string;
};

export default function PersonalData() {
  const auth = useContext(AuthContext);
  const [data, setData] = useState<PersonalData>();
  const params = useParams()

  const fetchData = async (personalNumber: number | undefined) => {
    let response;
    if (auth?.soldier) {
      response = await getSoldierDetails(personalNumber!);
    }
    setData(response);
  };

  useEffect(() => {
    fetchData(Number(params.personal_number));
  }, []);

    return (
        <div className="personalCard">
            <h3 className="personalName">{data?.name}</h3>
            <p><b>מספר אישי:</b> {data?.personal_number}</p>
            <p><b>תפקיד:</b> {data?.role}</p>
            <p><b>מפקד ישיר:</b> {data?.commander}</p>
            <p><b>כתובת:</b> {data?.address}</p>
            <p><b>טלפון:</b> {data?.phone}</p>
        </div>
    )
}
