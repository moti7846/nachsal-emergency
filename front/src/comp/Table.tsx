import { useEffect, useState } from "react"
import "./table.css"
import { getDirectSoldier } from "../api"
import { useNavigate } from "react-router"

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

export default function Table({ personalNumber }: TypeProps) {
    const [data, setData] = useState<Report[]>([])
    let navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            const response = await getDirectSoldier(personalNumber);
            setData(response);
            // console.log(response);
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="table-container">
                <button onClick={()=>console.log(data)}>log</button>
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
                            <tr key={i} onClick={() => navigate("/Solider_page")}>
                                <td>{report?.fullName}</td>
                                <td>{report?.personalNumber}</td>
                                <td>{report?.location}</td>
                                <td>{report?.status}</td>
                                <td>{report?.createAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
        </>
    )
}
