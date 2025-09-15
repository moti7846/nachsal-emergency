import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { type Report } from "./Table";
import { getDirectSoldier } from "../api";

export default function Solider() {
    const { personalNumber } = useParams();
    const [report, setReport] = useState<Report>();

    useEffect(() => {
        const fetchData = async () => {
            if (!personalNumber) return;
            const response = await getDirectSoldier(personalNumber);
            const result = await response.json();
            setReport(result);
        };
        fetchData();
    }, [personalNumber]);

    //   if (!report) return <div>טוען...</div>;

    return (
        <div className="table-container">
            <h2 className="table-header">פרטי חייל</h2>
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
                    <tr>
                        <td>{report?.fullName}</td>
                        <td>{report?.personalNumber}</td>
                        <td>{report?.location}</td>
                        <td>{report?.status}</td>
                        <td>{report?.createAt}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}