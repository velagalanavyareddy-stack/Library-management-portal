
import React, { useEffect, useState } from "react";
import {
  addTransaction,
  getBooks,
  getMembers,
  updateBook
} from "../services/api";

export default function IssueBook() {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [bookId, setBookId] = useState("");
  const [memberId, setMemberId] = useState("");
  const [message, setMessage] = useState("");

  const load = () =>
    Promise.all([getBooks(), getMembers()])
      .then(([b, m]) => {
        setBooks(b);
        setMembers(m);
      })
      .catch(() =>
        setMessage("Unable to load data. Start JSON Server.")
      );

  useEffect(() => {
    load();
  }, []);

  const available = books.filter(
    b => b.status === "Available"
  );

  // Function to issue a book
  const submit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!bookId || !memberId) {
      return setMessage("Please select both a book and a member.");
    }

    const book = books.find(
      b => String(b.id) === String(bookId)
    );

    if (!book || book.status !== "Available") {
      return setMessage("This book is not available.");
    }

    try {
      const today = new Date().toISOString().slice(0, 10);

      await addTransaction({
        bookId,
        memberId,
        issueDate: today,
        returnDate: "",
        status: "Issued"
      });

      await updateBook(bookId, {
        ...book,
        status: "Issued"
      });

      setBookId("");
      setMemberId("");
      setMessage("Book issued successfully.");

      await load();

    } catch {
      setMessage("Issue operation failed. Please check the server.");
    }
  };

  return (
    <div>
      <div className="page-heading">
        <div>
          <span className="eyebrow">CIRCULATION</span>
          <h2>Issue a book</h2>
          <p>Assign an available book to a registered member.</p>
        </div>
      </div>

      <div className="two-column">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h3>Issue details</h3>
              <p>Select a book and a member.</p>
            </div>
          </div>

          <form className="stack-form" onSubmit={submit}>
            <label>
              Select book
              <select
                required
                value={bookId}
                onChange={e => setBookId(e.target.value)}
              >
                <option value="">Choose an available book</option>

                {available.map(b => (
                  <option key={b.id} value={b.id}>
                    {b.title} — {b.author}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Select member
              <select
                required
                value={memberId}
                onChange={e => setMemberId(e.target.value)}
              >
                <option value="">Choose a member</option>

                {members.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </label>

            <button
              className="primary-btn"
              disabled={!available.length || !members.length || !bookId || !memberId}
            >
              Confirm issue
            </button>

            {message && (
              <div className="alert">{message}</div>
            )}
          </form>
        </section>

        <section className="info-card">
          <div className="info-icon">↗</div>
          <h3>Issuing a book</h3>

          <p>
            When you confirm an issue, a transaction is created
            and the selected book's status changes to <b>Issued</b>.
          </p>

          <div className="info-stat">
            <strong>{available.length}</strong>
            <span>books currently available</span>
          </div>
        </section>
      </div>
    </div>
  );
}
