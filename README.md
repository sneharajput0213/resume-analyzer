# ⚡ AI Career Intelligence Platform

A premium, state-of-the-art AI-powered platform designed to revolutionize the recruitment and job-seeking experience. Built with a stunning **Glassmorphism UI**, **Dark/Light Mode** support, and powered by **Groq Llama 3 AI**.

Developed with ❤️ by **[Ashish Jha](https://github.com/ashishjha1304)** · © 2026

---

## 🚀 Live Demo

🔗 [Frontend on Vercel](https://ai-cv-analysis-platform.vercel.app/)

---

## ✨ Features

### 🎯 For Job Seekers
- **ATS Compatibility Score** — Real-time analysis of how your resume performs against Applicant Tracking Systems.
- **AI Skill Gap Analysis** — Intelligent detection of missing skills required for your target roles.
- **Improvement Suggestions** — Actionable, AI-driven feedback to optimize every section of your resume.
- **Top Job Matches** — Personalized career recommendations based on your unique profile.

### 🛡️ For Recruiters
- **Candidate Trust Scoring** — AI-powered credibility assessment to help you hire with confidence.
- **GitHub Intelligence** — Deep analysis of candidate contributions, commit patterns, and code quality.
- **Red Flag Detection** — Automatic identification of potential profile gaps or inconsistencies.
- **AI Verdict** — A comprehensive, simplified final recommendation for each candidate.

---

## 🎨 Modern UI/UX

- **Premium Glassmorphism** — Beautiful frosted-glass components for a sleek, modern look.
- **Dynamic Dark/Light Mode** — Seamlessly switch between themes with a single click.
- **Micro-Animations** — Smooth transitions, floating orbs, and interactive elements for a "WOW" experience.
- **Fully Responsive** — Optimized for mobile, tablet, laptop, and desktop screen sizes.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Tailwind CSS v3, React Icons |
| Backend | Node.js, Express.js |
| Database | Supabase (PostgreSQL) |
| AI Engine | Groq API (Llama 3.3 70B) |
| Hosting (Frontend) | Vercel |
| Hosting (Backend) | Render |

---

## 📦 Getting Started

### Prerequisites
- Node.js v18+
- A Groq API Key — [Get it free](https://console.groq.com/keys)
- Supabase Project URL and Anon Key

### 1. Clone the repository
```bash
git clone https://github.com/ashishjha1304/ai-cv-analysis.git
cd ai-cv-analysis
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the `server/` folder:
```env
PORT=5000
GROQ_API_KEY=your_groq_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

Start the backend:
```bash
node server.js
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

Create a `.env` file in the `client/` folder:
```env
REACT_APP_API_URL=http://localhost:5000
```

Start the frontend:
```bash
npm start
```

The app will be running at `http://localhost:3000`.

---

## 🌐 Deployment

| Service | Platform | Notes |
|---------|----------|-------|
| Frontend | [Vercel](https://vercel.com) | Set `REACT_APP_API_URL` env var to your Render backend URL |
| Backend | [Render](https://render.com) | Set `GROQ_API_KEY`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `PORT=5000` env vars |

---

## 📁 Project Structure

```
ai-cv-analysis/
├── client/                  # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/      # Navbar, UploadCard, CandidateCard
│   │   ├── context/         # ThemeContext
│   │   ├── pages/           # Home, UploadPage, ResultPage, VerifyPage, etc.
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
│
└── server/                  # Express backend
    ├── controllers/
    ├── models/
    ├── routes/
    ├── server.js
    └── package.json
```

---

## 👤 Author

**Ashish Jha**
- **GitHub**: [@ashishjha1304](https://github.com/ashishjha1304)
- **LinkedIn**: [Ashish Jha](https://linkedin.com/in/ashishjha1304)

---

## 📄 License

This project is licensed under the **MIT License**.
