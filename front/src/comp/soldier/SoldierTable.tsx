import "./SoldierTable.css";
import { useContext, useEffect, useState } from "react";
import { getDirectSoldier } from "../../api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router";

export type Report = {
  personal_number: number;
  name: string;
  location: string;
  status: string;
  done: boolean | null;
  progress?: string;
  created_at: string;
};

export default function SoldierTable() {
  const auth = useContext(AuthContext);
  const [data, setData] = useState<Report[]>([]);
  const [progress, setProgress] = useState("");
  const navigate = useNavigate();
  const params = useParams()

  const fetchData = async (personalNumber: number | undefined) => {
    await navigate(`/soldier_page/${personalNumber}`)

    let responseDirectSoldiers;
    if (auth?.soldier) {
      responseDirectSoldiers = await getDirectSoldier(personalNumber!);
    }
    setData(responseDirectSoldiers);

    const updatedSoldiers = await Promise.all(
      responseDirectSoldiers.map(async (soldier: Report) => {
        const children = await getDirectSoldier(soldier.personal_number);
        const completed = children.filter((child: Report) => child.done === true).length;
        const total = children.length;
        if (total !== completed) {
          setProgress("half-full");
        }
        return { ...soldier, progress: `${total} / ${completed}` };
      })
    );
    setData(updatedSoldiers);
  };

  useEffect(() => {
    fetchData(Number(params.personal_number));
    setTimeout(() => {

    }, 100)
  }, []);

  return (
    <>
      {data.length > 0 && (
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
                  <th>מילאו</th>
                  <th>תאריך עדכון</th>
                </tr>
              </thead>
              <tbody>
                {data.map((report) => (
                  <tr
                    key={report.personal_number}
                    onClick={() => fetchData(report.personal_number)}
                  >
                    <td>{report.personal_number}</td>
                    <td>{report.name}</td>
                    <td>{report.location}</td>
                    <td>{report.status}</td>
                    <td className={progress}>{report.progress}</td>
                    <td>{report.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
