import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {  getSoldierDetails } from "../../api";
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

  const fetchData = async (personalNumber: number | undefined) => {
    let response;
    if (auth?.soldier) {
      response = await getSoldierDetails(personalNumber!);
    }
    setData(response);
  };

  useEffect(() => {
    fetchData(auth?.soldier?.personalNumber);
  },[]);

  return (
    <div className="personalCard">
      <h3 className="personalName">{data?.name}</h3>
      <p>מספר אישי: {data?.personal_number}</p>
      <p>תפקיד: {data?.role}</p>
      <p>מפקד ישיר: {data?.commander}</p>
      <p>כתובת: {data?.address}</p>
      <p>טלפון: {data?.phone}</p>
    </div>
  );
}
