# Library Management & Book Circulation Portal

## Requirements
- Node.js and npm
- VS Code (recommended)

## Run the project
1. Extract the ZIP file.
2. Open the `library-management-portal` folder in VS Code.
3. Open Terminal and run:

   npm install

4. Start JSON Server in terminal 1:

   npm run server

5. Start React in terminal 2:

   npm run dev

6. Open the local URL shown by Vite (usually http://localhost:5173).

## Features
- Dashboard counts and recent transactions
- Books: create, list, search, edit, delete
- Members: create, list, search, edit, delete
- Issue book: creates transaction and changes book status to Issued
- Return book: updates transaction and changes book status to Available
- Transactions: view and filter issue/return history

## API
- GET /books and GET /books/:id
- POST /books, PUT /books/:id, DELETE /books/:id
- GET /members and GET /members/:id
- POST /members, PUT /members/:id, DELETE /members/:id
- GET /transactions
- POST /transactions, PUT /transactions/:id, DELETE /transactions/:id

JSON Server runs at http://localhost:3000.
