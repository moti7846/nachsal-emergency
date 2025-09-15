import { useEffect, useState } from "react"
import "./styles/table.css"
type Report = {
    fullName: string,
    privateNumber: string,
    location: string,
    status: string,
    createAt: string
}

export default function Table() {
    const [data, setData] = useState<Report[]>([])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await getAll();
    //         setData(result);
    //     };
    //     fetchData();
    // }, []);

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
                                <td>{report.privateNumber}</td>
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
