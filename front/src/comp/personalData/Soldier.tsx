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

export type SoldierProps = {
    personalNumber: PersonalData;
    onBack: () => void;
};

export default function Soldier({ personalNumber, onBack }: SoldierProps) {
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
    }, [personalNumber]);

    return (
        <div className="personalCard">
            <button onClick={onBack}>← חזרה</button>
            <h3 className="personalName">{data?.name}</h3>
            <p>מספר אישי: {data?.personalNumber}</p>
            <p>תפקיד: {data?.role}</p>
            <p>מפקד ישיר: {data?.commander}</p>
            <p>כתובת: {data?.address}</p>
            <p>טלפון: {data?.phone}</p>
        </div>
    )
}
