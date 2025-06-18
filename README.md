# 🏥 Smart Healthcare Management System

A full-stack healthcare management application built using **Next.js**, **Prisma**, **Clerk**, and **Tailwind CSS**. It streamlines appointment booking, user authentication, doctor-patient interactions, and admin operations in a modern and responsive UI.

---

## 🚀 Features

- 🔐 Secure Authentication with Clerk (Patients, Doctors, Admins)
- 📅 Book and Manage Appointments
- 👨‍⚕️ Doctor Profile & Scheduling Management
- 📄 Medical Records and Patient History
- 📊 Dashboard for Admin Analytics
- 💬 Real-Time Feedback & Reviews
- 🎨 Responsive UI with Tailwind CSS
- 🌐 Role-based Routing Middleware

---

## 🛠️ Tech Stack

| Frontend       | Backend         | Database   | Auth     | Styling        |
|----------------|------------------|------------|----------|----------------|
| Next.js 14     | Prisma ORM       | PostgreSQL | Clerk    | Tailwind CSS   |
| React          | Next.js Middleware |           | JWT (via Clerk) | Radix UI      |

---

## 📁 Folder Structure

```
/app               → Next.js app directory with routes
/components       → Reusable UI components
/lib              → Utility functions and constants
/prisma           → Prisma schema and migrations
/public           → Static assets
/styles           → Global styles
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/healthcare.git
cd healthcare
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure EnvironmentA

Create a `.env` file and add:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/healthcare
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
```

### 4. Setup Database

```bash
npx prisma migrate dev --name init
npx prisma db seed
npx prisma studio  # optional UI for DB
```

### 5. Run the Dev Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) 🚀

---

## 🧪 Testing

> To be added: Cypress / Playwright tests for role-based dashboards.

---

## 🤝 Contributing

Feel free to fork this repo, open issues, or submit PRs to improve features, design, or performance.

---

## 🙋‍♀️ Acknowledgments

- [Next.js Docs](https://nextjs.org/docs)
- [Clerk.dev](https://clerk.dev/)
- [Prisma ORM](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
