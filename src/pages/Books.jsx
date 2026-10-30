import React , { useEffect, useState } from "react";
import { addBook, deleteBook, getBooks, updateBook } from "../services/api";
import StatusBadge from "../components/StatusBadge";

const blank = { title: "", author: "", category: "", status: "Available" };
export default function Books() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const load = () => getBooks().then(setBooks).catch(() => setError("Unable to load books. Is JSON Server running?"));
  useEffect(() => { load(); }, []);
  const submit = async e => {
    e.preventDefault(); setError("");
    try {
      if (editing) await updateBook(editing, form);
      else await addBook(form);
      setForm(blank); setEditing(null); await load();
    } catch { setError("Could not save the book. Please try again."); }
  };
  const edit = book => { setEditing(book.id); setForm({ title: book.title, author: book.author, category: book.category, status: book.status }); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const remove = async book => {
    if (book.status === "Issued") return setError("Return this book before deleting it.");
    if (!window.confirm(`Delete "${book.title}"?`)) return;
    try { await deleteBook(book.id); await load(); } catch { setError("Could not delete book."); }
  };
  const filtered = books.filter(b => `${b.title} ${b.author} ${b.category}`.toLowerCase().includes(search.toLowerCase()));
  return <div>
    <div className="page-heading"><div><span className="eyebrow">CATALOGUE</span><h2>Books</h2><p>Add, update, search and manage library books.</p></div><span className="count-pill">{books.length} books</span></div>
    {error && <div className="alert error">{error}</div>}
    <section className="panel form-panel"><div className="panel-heading"><div><h3>{editing ? "Edit book" : "Add a new book"}</h3><p>Enter the book details below.</p></div></div>
      <form onSubmit={submit} className="form-grid">
        <label>Book title<input required value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="e.g. Java Programming"/></label>
        <label>Author<input required value={form.author} onChange={e=>setForm({...form,author:e.target.value})} placeholder="Author name"/></label>
        <label>Category<input required value={form.category} onChange={e=>setForm({...form,category:e.target.value})} placeholder="e.g. Programming"/></label>
        <div className="form-actions"><button className="primary-btn">{editing ? "Save changes" : "Add book"}</button>{editing && <button type="button" className="secondary-btn" onClick={()=>{setEditing(null);setForm(blank)}}>Cancel</button>}</div>
      </form>
    </section>
    <section className="panel"><div className="panel-heading responsive-heading"><div><h3>Book catalogue</h3><p>All books stored in the database.</p></div><input className="search-input" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search books..."/></div>
      <div className="table-wrap"><table><thead><tr><th>Book title</th><th>Author</th><th>Category</th><th>Status</th><th>Actions</th></tr></thead><tbody>
        {filtered.map(b=><tr key={b.id}><td className="strong">{b.title}</td><td>{b.author}</td><td>{b.category}</td><td><StatusBadge status={b.status}/></td><td><div className="actions"><button className="text-btn" onClick={()=>edit(b)}>Edit</button><button className="text-btn danger-text" onClick={()=>remove(b)}>Delete</button></div></td></tr>)}
        {filtered.length===0 && <tr><td colSpan="5" className="empty">No books found.</td></tr>}
      </tbody></table></div>
    </section>
  </div>;
}
