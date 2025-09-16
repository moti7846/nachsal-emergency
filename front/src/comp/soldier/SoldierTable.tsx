import { useContext, useEffect, useState } from "react"
import "./table.css"
import { getDirectSoldier } from "../../api"
import { AuthContext } from "../../context/AuthContext"
import Soldier, { type PersonalData ,type SoldierProps } from "../personalData/Soldier"

export type Report = {
    personal_number: number;
    name: string;
    location: string;
    status: string;
    done: string;
    created_at: string;
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
    };

    useEffect(()=>{
        fetchData()
    },[])

      if (selectedSoldier) {
        
        return (
            <Soldier
                personalNumber={{
                    personalNumber: selectedSoldier.personal_number,
                    name: selectedSoldier.name,
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
                        <th>בוצע</th>
                        <th>תאריך עדכון</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((report,i) => (
                        <tr key={i} onClick={() => setSelectedSoldier(report)}>
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
        </>
    )
}
