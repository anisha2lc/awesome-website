# AWWWSOME Website

This is an **AWWWSOME** web application built with modern technologies.  
It provides different functionalities based on user roles (**Admin** and **Viewer**).

---

## Features

- **Dashboard Page** – App design as per figma.
- **Chart Page** – Chart using chartjs (Data is adjustable when clicked in the bars).
- **Profile Page** – View and edit profile details.  
  - *Admin:* Can edit profile details.  
  - *Viewer:* Can only view profile details (fields are disabled).
- **Users Page** – View, Update and Delete User Details.  
  - Accessible **only** to Admins.
- **Role-based Access Control** – Sidebar menu and routes adapt based on user role.
- **Login System** – Different credentials for Admin and Viewer.

---

## Roles

### **Admin**
- Full access to all pages.
- Can edit profile details.
- Can view, edit, and delete users.

### **Viewer**
- Limited access (no Users page).
- Cannot edit profile details.

---

## Tech Stack Used

- **Frontend:** React.js + Vite
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Data Fetching:** React Query

---

## Login Credentials

| Role   | Email                   | Password     |
|--------|------------------------|--------------|
| Admin  | `admin@example.com`    | `password123` |
| Viewer | `viewer@example.com`   | `password123` |

---

## Getting Started

```bash
git clone <repository-url>
cd <project-folder>

npm install

npm run dev

