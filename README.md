# 🌳 Miti Tibeb — *Art of Trees*

**Miti** *(Swahili: Trees)*  
**Tibeb** *(Amharic: Art / Wisdom)*  

*Miti Tibeb* is a frontend project dedicated to the celebration of craftsmanship, nature, and elegance in timber-based furniture. Built with **Next.js**, it interfaces with a powerful Go backend to deliver a poetic and immersive online store experience.

---

## 🌐 Overview

This application serves as the user-facing frontend for the [Miti Arts Backend](https://github.com/Mr-Ndi/Miti_Art), enabling:
- Product discovery
- User and vendor authentication
- Secure transactions and session handling
- Dynamic content delivery via RESTful APIs

---

## 🛠 Tech Stack

- **Frontend Framework**: [Next.js](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS *(optional if enabled)*
- **API Communication**: REST using `fetch` or `axios`
- **Backend**: [Miti Arts Backend (Go, Gin, PostgreSQL)](https://github.com/Mr-Ndi/Miti_Art)

---

## 🔐 Authentication & API Integration

This project consumes secure JWT-protected endpoints provided by the backend, including:

### 🔑 Auth Routes
- `POST /user/login`
- `POST /user/register`
- `POST /vendor/register` (with token header)
- `POST /admin/invite` *(admin only)*

### 🪑 Product & Vendor Features
- Search and filtering for furniture
- Vendor management and onboarding via email token invites

Refer to the [Miti Arts API Docs](https://github.com/Mr-Ndi/Miti_Art#api-endpoints) for detailed payloads and responses.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/miti-tibeb.git
cd miti-tibeb
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

*(Adjust the backend URL as needed)*

---

## 🧪 Development

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧱 Project Structure

```bash
.
├── app/               # App Router pages (or pages/ if using legacy routing)
├── components/        # Reusable UI components
├── lib/               # API helpers, utilities
├── public/            # Static assets
├── styles/            # Global styles or Tailwind config
├── tsconfig.json      # TypeScript config
└── .env.local         # Environment variables
```

---

## 🤝 Contributing

We welcome contributors who share the love of nature, craftsmanship, and clean code.

1. Fork the repo
2. Create a feature branch:

   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit and push:

   ```bash
   git commit -m "Add amazing feature"
   git push origin feature/amazing-feature
   ```
4. Open a Pull Request

---

## 📜 License

This project inherits the philosophy of open craftsmanship — built to inspire.
License details TBD.

---

## 🌿 Inspiration

> “To dwell among trees is to live within poetry itself.”
> — *Miti Tibeb*

---
