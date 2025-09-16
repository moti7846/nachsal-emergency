import { useContext, useEffect, useState } from "react"
import "./table.css"
import { getDirectSoldier } from "../../api"
import { AuthContext } from "../../context/AuthContext"
import Soldier, { type PersonalData ,type SoldierProps } from "../personalData/Soldier"

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
    // const [personalDate, setPersonalDate] = useState<PersonalData>()
    // const [togel,setTogel] = useState(false)
    const [selectedSoldier, setSelectedSoldier] = useState<Report | null>(null);
    // const content = <Soldier />

    const fetchData = async () => {
        let response;
        if (auth?.soldier) {
            response = await getDirectSoldier(auth?.soldier?.personalNumber);
        }
        setData(response);
        // setPersonalDate(response)
    };

    useEffect(()=>{
        fetchData()
    },[])

      if (selectedSoldier) {
        return (
            <Soldier
                personalNumber={{
                    personalNumber: selectedSoldier.personalNumber,
                    name: selectedSoldier.fullName,
                    role: "לא ידוע", 
                    commander: 0,
                    address: "",
                    phone: "",
                }}
                onBack={() => setSelectedSoldier(null)}
            />
        );
    }
    return (
        <>
            {/* <button onClick={() => console.log(data)}>log</button> */}
            {/* {content} */}
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
                        <tr key={i} onClick={() => setSelectedSoldier(report)}>
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
