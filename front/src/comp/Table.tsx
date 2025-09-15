import { useEffect, useState } from "react"
import "./table.css"
import { getDirectSoldier } from "../api"

type TypeProps = {
    personalNumber: string,
}

export type Report = {
    fullName: string,
    personalNumber: string,
    location: string,
    status: string,
    createAt: string
}

export default function Table({personalNumber}:TypeProps) {
    const [data, setData] = useState<Report[]>([])
    useEffect(() => {
        const fetchData = async () => {
            const response = await getDirectSoldier(personalNumber);
            const result = await response.json();
            setData(result);
        };
        fetchData();
    }, []);
    return (
        <>
            <div className="table-container">
                <h2 className="table-header">דו"ח נכס"ל</h2>
                <table className="report-table">
                    <thead>
                        <tr>
                            <th>שם החייל</th>
                            <th>מ.א</th>
                            <th>מיקום</th>
                            <th>מצב החייל</th>
                            <th>תאריך עדכון</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((report, i) => (
                            <tr key={i}>
                                <td>{report.fullName}</td>
                                <td>{report.personalNumber}</td>
                                <td>{report.location}</td>
                                <td>{report.status}</td>
                                <td>{report.createAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
