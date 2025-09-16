import { useContext, useEffect, useState } from "react"
import "./table.css"
import { getDirectSoldier } from "../../api"
import { useNavigate } from "react-router"
import { AuthContext } from "../../context/AuthContext"

export type Report = {
    fullName: string,
    personalNumber: number,
    location: string,
    status: string,
    createAt: string
}

export type Report2 = {
    address: string;
    commander: number;
    name: string;
    password: string;
    personal_number: number;
    phone: string;
    role: string;
}

export default function Table() {
    const auth = useContext(AuthContext);
    const [data, setData] = useState<Report2[]>([])
    let navigate = useNavigate()

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
    useEffect(() => {
        setData(data)
        console.log("sss", data);

    }, [data])
    return (
        <>
            {/* <button onClick={() => console.log(data)}>log</button> */}
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
                    {data.map((report) => (
                        <tr key={report.personal_number} onClick={() => navigate("/Solider_page")}>
                            <td>{report.personal_number}</td>
                            <td>{report.name}</td>
                            <td>{report.address}</td>
                            <td>{report.phone}</td>
                            <td>{report.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
