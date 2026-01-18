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
├── app/
├── components/
├── ui/                          # shadcn/ui components
│   │   │   ├── alert.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   └── label.tsx
│   │   │
│   │   ├── user/                        # User-related components
│   │   │   ├── UserCard.tsx            # User card component
│   │   │   ├── UserDetailModal.tsx     # User detail modal
│   │   │   ├── UserFormModal.tsx       # Add/Edit form modal
│   │   │   └── index.ts                # Export barrel
│   │   │
│   │   ├── common/                      # Shared components
│   │   │   ├── Toast.tsx               # Toast notification
│   │   │   ├── ConfirmDialog.tsx       # Confirmation dialog
│   │   │   ├── LoadingSpinner.tsx      # Loading state
│   │   │   ├── EmptyState.tsx          # Empty state
│   │   │   └── index.ts    
├── interface/
│   └── global.interface.ts
├── context/
│   └── UsersContextProvider.tsx
├── index.css
└── App.tsx
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
git clone https://github.com/yourusername/obs-management-user.git
cd obs-management-user
```


---

## 🚀 Getting Started

```bash
npm install
npm run dev




