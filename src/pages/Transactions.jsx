import React,{ useEffect, useState } from "react";
import { getBooks, getMembers, getTransactions } from "../services/api";
import StatusBadge from "../components/StatusBadge";

export default function Transactions(){
  const [rows,setRows]=useState([]),[filter,setFilter]=useState("All"),[error,setError]=useState("");
  useEffect(()=>{Promise.all([getBooks(),getMembers(),getTransactions()]).then(([books,members,transactions])=>setRows(transactions.map(t=>({...t,book:books.find(b=>b.id===t.bookId),member:members.find(m=>m.id===t.memberId)})).sort((a,b)=>b.issueDate.localeCompare(a.issueDate)))).catch(()=>setError("Unable to load transactions. Start JSON Server."))},[]);
  const filtered=rows.filter(t=>filter==="All"||t.status===filter);
  return <div><div className="page-heading"><div><span className="eyebrow">RECORDS</span><h2>Transactions</h2><p>Complete history of book issues and returns.</p></div><span className="count-pill">{rows.length} records</span></div>{error&&<div className="alert error">{error}</div>}
    <section className="panel"><div className="panel-heading responsive-heading"><div><h3>Circulation history</h3><p>Track every issue and return.</p></div><select className="filter-select" value={filter} onChange={e=>setFilter(e.target.value)}><option>All</option><option>Issued</option><option>Returned</option></select></div>
      <div className="table-wrap"><table><thead><tr><th>Book</th><th>Member</th><th>Issue date</th><th>Return date</th><th>Status</th></tr></thead><tbody>{filtered.map(t=><tr key={t.id}><td className="strong">{t.book?.title||"Unknown book"}</td><td>{t.member?.name||"Unknown member"}</td><td>{t.issueDate}</td><td>{t.returnDate||"—"}</td><td><StatusBadge status={t.status}/></td></tr>)}{filtered.length===0&&<tr><td colSpan="5" className="empty">No transactions found.</td></tr>}</tbody></table></div>
    </section>
  </div>;
}
