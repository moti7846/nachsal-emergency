import "./table.css"
import { useContext, useEffect, useState } from "react"
import { getDirectSoldier } from "../../api"
import { AuthContext } from "../../context/AuthContext"

export type Report = {
    personal_number: number;
    name: string;
    location: string;
    status: string;
    done: string;
    created_at: string;
}

export default function SoldierTable() {
    const auth = useContext(AuthContext);
    const [data, setData] = useState<Report[]>([])

    const fetchData = async (personalNumber: number | undefined) => {
        let responseDirectSoldiers;
        if (auth?.soldier) {
            responseDirectSoldiers = await getDirectSoldier(personalNumber!);
        }
        setData(responseDirectSoldiers);
    };

    useEffect(() => {
        fetchData(auth?.soldier?.personalNumber)
    }, [])

    return (
        <>
            {data.length > 0 &&
                <div>
                    <h2 className="table-header">דו"ח נכס"ל</h2>
                    <div className="table-container">
                        <table className="report-table">
                        <thead>
                            <tr>
                                <th>מ.א</th>
                                <th>שם החייל</th>
                                <th>מיקום</th>
                                <th>מצב החייל</th>
                                <th>בוצע</th>
                                <th>תאריך עדכון</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((report) => (
                                <tr key={report.personal_number} onClick={() => fetchData(report.personal_number)} >
                                    <td>{report.personal_number}</td>
                                    <td>{report.name}</td>
                                    <td>{report.location}</td>
                                    <td>{report.status}</td>
                                    <td>{report.done}</td>
                                    <td>{report.created_at}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                </div>
            }
        </>
    )
}
