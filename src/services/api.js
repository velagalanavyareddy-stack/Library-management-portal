const BASE_URL = "http://localhost:3000";

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  if (response.status === 204) return null;
  return response.json();
}

export const getBooks = () => request("/books");
export const getBookById = (id) => request(`/books/${id}`);
export const addBook = (book) => request("/books", { method: "POST", body: JSON.stringify(book) });
export const updateBook = (id, book) => request(`/books/${id}`, { method: "PUT", body: JSON.stringify(book) });
export const deleteBook = (id) => request(`/books/${id}`, { method: "DELETE" });

export const getMembers = () => request("/members");
export const getMemberById = (id) => request(`/members/${id}`);
export const addMember = (member) => request("/members", { method: "POST", body: JSON.stringify(member) });
export const updateMember = (id, member) => request(`/members/${id}`, { method: "PUT", body: JSON.stringify(member) });
export const deleteMember = (id) => request(`/members/${id}`, { method: "DELETE" });

export const getTransactions = () => request("/transactions");
export const addTransaction = (transaction) => request("/transactions", { method: "POST", body: JSON.stringify(transaction) });
export const updateTransaction = (id, transaction) => request(`/transactions/${id}`, { method: "PUT", body: JSON.stringify(transaction) });
export const deleteTransaction = (id) => request(`/transactions/${id}`, { method: "DELETE" });
