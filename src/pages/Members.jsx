import React ,{ useEffect, useState } from "react";
import { addMember, deleteMember, getMembers, getTransactions, updateMember } from "../services/api";

const blank = { name: "", email: "", phone: "" };
export default function Members() {
  const [members,setMembers]=useState([]), [form,setForm]=useState(blank), [editing,setEditing]=useState(null), [search,setSearch]=useState(""), [error,setError]=useState("");
  const load=()=>getMembers().then(setMembers).catch(()=>setError("Unable to load members. Start JSON Server."));
  useEffect(()=>{load()},[]);
  const submit=async e=>{e.preventDefault();setError("");try{if(editing)await updateMember(editing,form);else await addMember(form);setForm(blank);setEditing(null);await load()}catch{setError("Could not save member.")}};
  const remove=async m=>{try{const tx=await getTransactions();if(tx.some(t=>t.memberId===m.id&&t.status==="Issued"))return setError("This member has an issued book. Complete the return first.");if(window.confirm(`Delete ${m.name}?`)){await deleteMember(m.id);await load()}}catch{setError("Could not delete member.")}};
  const filtered=members.filter(m=>`${m.name} ${m.email} ${m.phone}`.toLowerCase().includes(search.toLowerCase()));
  return <div><div className="page-heading"><div><span className="eyebrow">PEOPLE</span><h2>Members</h2><p>Manage registered library members.</p></div><span className="count-pill">{members.length} members</span></div>
    {error&&<div className="alert error">{error}</div>}
    <section className="panel form-panel"><div className="panel-heading"><div><h3>{editing?"Edit member":"Add a new member"}</h3><p>Member contact information</p></div></div>
      <form className="form-grid" onSubmit={submit}><label>Full name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Member name"/></label><label>Email address<input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="name@example.com"/></label><label>Phone number<input required pattern="[0-9]{10}" title="Enter a 10 digit phone number" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="10 digit number"/></label><div className="form-actions"><button className="primary-btn">{editing?"Save changes":"Add member"}</button>{editing&&<button type="button" className="secondary-btn" onClick={()=>{setEditing(null);setForm(blank)}}>Cancel</button>}</div></form>
    </section>
    <section className="panel"><div className="panel-heading responsive-heading"><div><h3>Member directory</h3><p>All registered members</p></div><input className="search-input" placeholder="Search members..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
      <div className="table-wrap"><table><thead><tr><th>Member</th><th>Email</th><th>Phone</th><th>Actions</th></tr></thead><tbody>{filtered.map(m=><tr key={m.id}><td className="strong">{m.name}</td><td>{m.email}</td><td>{m.phone}</td><td><div className="actions"><button className="text-btn" onClick={()=>{setEditing(m.id);setForm({name:m.name,email:m.email,phone:m.phone})}}>Edit</button><button className="text-btn danger-text" onClick={()=>remove(m)}>Delete</button></div></td></tr>)}{filtered.length===0&&<tr><td colSpan="4" className="empty">No members found.</td></tr>}</tbody></table></div>
    </section>
  </div>;
}
