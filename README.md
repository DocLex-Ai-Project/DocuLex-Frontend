# AI Document Verification System – Frontend

## Overview

This repository contains the **frontend application** for the AI Document Verification System. The platform allows users to upload documents, track verification status, and interact with an AI-assisted interface for document validation. The frontend provides a responsive and user-friendly dashboard built using modern web technologies.

The application communicates with the backend API to manage authentication, document uploads, verification results, and review workflows.

---

## Features

* Secure user authentication (User / Lawyer login)
* Document upload and management
* AI verification result display
* Request review from lawyers
* Document status tracking
* AI-assisted document creation editor
* Responsive dashboard UI

---

## Tech Stack

Frontend technologies used in this project:

* **React.js**
* **TypeScript**
* **Material UI**
* **Axios**
* **React Router**
* **Vite / React Scripts**

---

## Project Structure

```
src/
 ├── components/
 │   ├── layout/
 │   ├── dashboard/
 │   ├── document/
 │   └── editor/
 │
 ├── pages/
 │   ├── login
 │   ├── register
 │   ├── dashboard
 │   ├── upload
 │   └── review
 │
 ├── services/
 │   └── api.ts
 │
 ├── hooks/
 │
 ├── utils/
 │
 └── App.tsx
```

---

## Installation

Clone the repository:

```
git clone https://github.com/yourusername/doclex-frontend.git
```

Navigate into the project directory:

```
cd doclex-frontend
```

Install dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

The application will start at:

```
http://localhost:5173
```

---

## Environment Variables

Create a `.env` file in the root directory:

```
VITE_API_URL=http://localhost:5000/api
```

---

## Screens

Main UI modules include:

* Login / Authentication
* User Dashboard
* Document Upload Interface
* AI Review Result Panel
* Lawyer Review Requests
* AI Document Editor

---

## Future Improvements

* Real-time AI analysis display
* Document comparison viewer
* Improved legal document editor
* Notification system
* Multi-language support

---

## License

This project is licensed under the MIT License.
