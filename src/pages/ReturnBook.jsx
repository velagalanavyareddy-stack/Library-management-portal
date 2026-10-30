import React, { useEffect, useState } from "react";
import { getBooks, getMembers, getTransactions, updateBook, updateTransaction } from "../services/api";

export default function ReturnBook(){
  const [rows,setRows]=useState([]),[message,setMessage]=useState("");
  const load=async()=>{try{const [books,members,transactions]=await Promise.all([getBooks(),getMembers(),getTransactions()]);setRows(transactions.filter(t=>t.status==="Issued").map(t=>({...t,book:books.find(b=>b.id===t.bookId),member:members.find(m=>m.id===t.memberId)})))}catch{setMessage("Unable to load issued books. Start JSON Server.")}};
  useEffect(()=>{load()},[]);
  const returnBook=async t=>{if(!window.confirm(`Confirm return of "${t.book?.title}"?`))return;try{const today=new Date().toISOString().slice(0,10);await updateTransaction(t.id,{...t,returnDate:today,status:"Returned"});if(t.book)await updateBook(t.book.id,{...t.book,status:"Available"});setMessage("Book returned successfully.");await load()}catch{setMessage("Return operation failed.")}};
  return <div><div className="page-heading"><div><span className="eyebrow">CIRCULATION</span><h2>Return a book</h2><p>Record books returned by library members.</p></div></div>{message&&<div className="alert">{message}</div>}
    <section className="panel"><div className="panel-heading"><div><h3>Currently issued books</h3><p>Books that have not yet been returned.</p></div><span className="count-pill">{rows.length} issued</span></div><div className="table-wrap"><table><thead><tr><th>Book</th><th>Member</th><th>Issue date</th><th>Action</th></tr></thead><tbody>{rows.map(t=><tr key={t.id}><td className="strong">{t.book?.title||"Unknown book"}</td><td>{t.member?.name||"Unknown member"}</td><td>{t.issueDate}</td><td><button className="primary-btn small-btn" onClick={()=>returnBook(t)}>Mark returned</button></td></tr>)}{rows.length===0&&<tr><td colSpan="4" className="empty">There are no books waiting to be returned.</td></tr>}</tbody></table></div></section>
  </div>;
}
