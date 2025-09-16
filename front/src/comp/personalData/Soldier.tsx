import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getDirectSoldier } from "../../api";
import "./soldier.css"

export type PersonalData = {
    personalNumber: number;
    name: string;
    role: string;
    commander: number;
    address: string;
    phone: string;
}

export default function Soldier() {
    const auth = useContext(AuthContext);
    const [data, setData] = useState<PersonalData>()

    const fetchData = async () => {
        let response;
        if (auth?.soldier) {
            response = await getDirectSoldier(auth?.soldier?.personalNumber);
        }
        setData(response);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="personalCard">
            <h3 className="personal-name">{data?.name}</h3>
            <p>מספר אישי: {data?.personalNumber}</p>
            <p>תפקיד: {data?.role}</p>
            <p>מפקד ישיר: {data?.commander}</p>
            <p>כתובת: {data?.address}</p>
            <p>טלפון: {data?.phone}</p>
        </div>
    )
}
