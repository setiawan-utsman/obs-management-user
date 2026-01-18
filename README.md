# User Management App

A modern **User Management** web application built with **React**, **Tailwind CSS**, and **shadcn/ui**.  
This app demonstrates clean UI, interactive form validation, and reusable component patterns.

---

## ✨ Features

- 📋 User list with card layout
- ➕ Add user via modal
- ✏️ Edit user information
- 👁️ View user detail in modal
- 🗑️ Delete user
- ✅ Real-time form validation (error disappears as user types)
- 🎨 Modern UI using Tailwind + shadcn/ui
- 📱 Responsive & user-friendly

---

## 🛠️ Tech Stack

- **React** (with TypeScript)
- **Tailwind CSS** v3
- **shadcn/ui**
- **lucide-react** (icons)

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── UserCard.tsx
│   ├── UserFormModal.tsx
│   ├── UserDetailModal.tsx
│   └── InfoItem.tsx
├── types/
│   └── user.ts
├── pages/
│   └── Users.tsx
├── index.css
└── main.tsx
```



---

## 🧩 User Types

```ts
export type User = {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website?: string
  company: {
    name: string
    catchPhrase: string
  }
}

export type UserFormData = {
  name: string
  username: string
  email: string
  phone: string
  website?: string
}
```

## 📥 Installation
```ts
git clone https://github.com/yourusername/obs-user-management.git
cd obs-user-management
```


---

## 🚀 Getting Started

```bash
npm install
npm run dev




