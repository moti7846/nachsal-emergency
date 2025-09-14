import { useState } from "react"

type Report = {
    fullName: string,
    privateNumber: string,
    location: string,
    status: string,
    createAt: string
}

export default function Table() {
    const [data, setData] = useState<Report[]>([])
    return (
        <div className="table">
            <h2>דו"ח נכס"ל</h2>
            <table className="report">
                <thead>
                    <tr>
                        <th>תאריך עדכון</th>
                        <th>מצב החייל</th>
                        <th>מיקום</th>
                        <th>מ.א</th>
                        <th>שם החייל</th>
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
    )
}
