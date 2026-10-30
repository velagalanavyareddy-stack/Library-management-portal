import React from "react";
export default function StatusBadge({ status }) {
  return <span className={`status-badge ${status === "Available" || status === "Returned" ? "good" : "warning"}`}>{status}</span>;
}
