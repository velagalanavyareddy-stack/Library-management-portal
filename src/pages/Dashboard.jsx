import React,{ useEffect, useState } from "react";
import { getBooks, getMembers, getTransactions } from "../services/api";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";

export default function Dashboard() {
  const [data, setData] = useState({ books: [], members: [], transactions: [] });
  const [error, setError] = useState("");
  useEffect(() => {
    Promise.all([getBooks(), getMembers(), getTransactions()])
      .then(([books, members, transactions]) => setData({ books, members, transactions }))
      .catch(() => setError("Could not connect to JSON Server. Start it on port 3000."));
  }, []);
  const issued = data.books.filter(b => b.status === "Issued").length;
  const available = data.books.filter(b => b.status === "Available").length;
const recent = [...data.transactions]
  .sort((a, b) => (b.issueDate || "").localeCompare(a.issueDate || ""))
  .slice(0, 5);
  const bookName = id => data.books.find(b => b.id === id)?.title || "Unknown book";
  const memberName = id => data.members.find(m => m.id === id)?.name || "Unknown member";
  return <div>
    <div className="page-heading"><div><span className="eyebrow">OVERVIEW</span><h2>Dashboard</h2><p>Here's what's happening in your library today.</p></div></div>
    {error && <div className="alert error">{error}</div>}
    <div className="stats-grid">
      <StatCard label="Total books" value={data.books.length} note="Books in catalogue" icon="▤" />
      <StatCard label="Available books" value={available} note="Ready to be issued" icon="✓" />
      <StatCard label="Issued books" value={issued} note="Currently with members" icon="↗" />
      <StatCard label="Total members" value={data.members.length} note="Registered members" icon="♙" />
    </div>
    <section className="panel"><div className="panel-heading"><div><h3>Recent transactions</h3><p>Latest book circulation activity</p></div></div>
      {recent.length === 0 ? <p className="empty">No transactions yet.</p> : <div className="table-wrap"><table><thead><tr><th>Book</th><th>Member</th><th>Issue date</th><th>Return date</th><th>Status</th></tr></thead><tbody>
        {recent.map(t => <tr key={t.id}><td className="strong">{bookName(t.bookId)}</td><td>{memberName(t.memberId)}</td><td>{t.issueDate}</td><td>{t.returnDate || "—"}</td><td><StatusBadge status={t.status}/></td></tr>)}
      </tbody></table></div>}
    </section>
  </div>;
}
