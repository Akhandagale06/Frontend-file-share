# 💻 Pro-Share Frontend (React)

Frontend application for **Pro-Share**, built using React. It provides a user-friendly interface for uploading, managing, and downloading files.

---

## 🚀 Features

### 👤 Authentication

* Clerk authentication (Login/Signup)
* Secure session handling

### 📁 File Management UI

* Upload files to Supabase
* View and manage uploaded files
* Download files instantly

### 💳 Payments UI

* Razorpay integration for purchasing credits
* Real-time payment status

---

## 🛠️ Tech Stack

* React (Vite)
* Axios
* Clerk Authentication
* Tailwind CSS (optional if used)

---

## ⚙️ Setup & Run

### 1️⃣ Install Dependencies

```bash id="f1install"
npm install
```

---

### 2️⃣ Configure Environment Variables

```env id="f1env"
VITE_API_BASE_URL=http://localhost:8080/api/v1.0
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_key
```

---

### 3️⃣ Run App

```bash id="f1run"
npm run dev
```

---

## 📌 Features Overview

* Secure API communication with backend
* Token-based requests using Clerk
* File download using direct Supabase URLs

---

## 🔗 Backend API

Make sure backend is running:

```id="f1api"
http://localhost:8080/api/v1.0
```
