import React from "react";
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Members from "./pages/Members";
import IssueBook from "./pages/IssueBook";
import ReturnBook from "./pages/ReturnBook";
import Transactions from "./pages/Transactions";

const links = [
  ["/dashboard", "Dashboard"],
  ["/books", "Books"],
  ["/members", "Members"],
  ["/issue", "Issue Book"],
  ["/return", "Return Book"],
  ["/transactions", "Transactions"]
];

export default function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-icon">▤</span><div><b>LibraDesk</b><small>Library Portal</small></div></div>
        <nav>
          {links.map(([to, label]) => <NavLink key={to} to={to} className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>{label}</NavLink>)}
        </nav>
        <div className="sidebar-note">Library Management<br/> & Book Circulation</div>
      </aside>
      <main className="main-area">
        <header className="topbar"><div><span className="eyebrow">LIBRARY ADMINISTRATION</span><h1>Library Management Portal</h1></div><div className="admin-chip"><span className="avatar">L</span><span>Librarian</span></div></header>
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/books" element={<Books />} />
            <Route path="/members" element={<Members />} />
            <Route path="/issue" element={<IssueBook />} />
            <Route path="/return" element={<ReturnBook />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
