import { useContext, useEffect, useState } from "react"
import "./table.css"
import { getDirectSoldier } from "../../api"
import { useNavigate } from "react-router"
import { AuthContext } from "../../context/AuthContext"
import Soldier from "../personalData/Soldier"

export type Report = {
    fullName: string;
    personalNumber: number;
    location: string;
    status: string;
    createAt: string;
}



export default function SoldierTable() {
    const auth = useContext(AuthContext);
    const [data, setData] = useState<Report[]>([])
    // let navigate = useNavigate()
    const content = <Soldier />

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
        <>
            {/* <button onClick={() => console.log(data)}>log</button> */}
            {content}
            <h2 className="table-header">דו"ח נכס"ל</h2>
            <table className="report-table">
                <thead>
                    <tr>
                        <th>מ.א</th>
                        <th>שם החייל</th>
                        <th>מיקום</th>
                        <th>מצב החייל</th>
                        <th>תאריך עדכון</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((report,i) => (
                        <tr key={i} onClick={() => content}>
                            <td>{report.personalNumber}</td>
                            <td>{report.fullName}</td>
                            <td>{report.location}</td>
                            <td>{report.status}</td>
                            <td>{report.createAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
