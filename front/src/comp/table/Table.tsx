import { useContext, useEffect, useState } from "react"
import "./table.css"
import { getDirectSoldier } from "../../api"
import { useNavigate } from "react-router"
import { AuthContext } from "../../context/AuthContext"

export type Report = {
    personal_number: number,
    name: string,
    location: string,
    status: string,
    done: string
    created_at: string
}

// export type Report2 = {
//     address: string;
//     commander: number;
//     name: string;
//     password: string;
//     personal_number: number;
//     phone: string;
//     role: string;
// }

export default function Table() {
    const auth = useContext(AuthContext);
    const [data, setData] = useState<Report[]>([])
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

    return (
        <div className="aaa">
            <h2 className="table-header">דו"ח נכס"ל</h2>
            <div className="divTable">
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
                            <tr key={report.personal_number} onClick={() => navigate("/Solider_page")}>
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
    )
}
