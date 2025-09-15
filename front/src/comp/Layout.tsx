import type { PropsWithChildren } from "react";
import "./styles/Layout.css"

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <header>
        <div className="headbar">
          <h2 className="slogen-idf">מערכת נכס״ל צה״ל</h2>
          <img src="/IDF.png" alt="לוגו של צהל" className="logo-idf" />
        </div>
      </header>
      <main>
        {children}
      </main>
    </>
  )
}
