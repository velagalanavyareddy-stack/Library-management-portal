import React from "react";
export default function StatCard({ label, value, note, icon }) {
  return <div className="stat-card">
    <div className="stat-top">
      <span>{label}</span>
      <span className="stat-icon">{icon}</span>
      </div><strong>{value}</strong>
      <small>{note}</small>
      </div>;
}
