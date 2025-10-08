AI Content Creator App is a modern, full-stack platform that empowers digital creators to ideate, script, and generate engaging content for YouTube, TikTok, Instagram, and beyond powered by AI.

This app combines OpenRouter’s AI capabilities, Firebase Authentication, and Paystack payments to give users a seamless experience in content creation, monetization, and automation.

🚀 Features

🤖 AI Script Generator – Instantly create video scripts, captions, and storylines.

🔐 Firebase Authentication – Sign up and log in using Email or Google.

💳 Paystack Integration – Secure, fast, and localized payments for Africa.

🧠 OpenRouter AI Integration – Generate unique, high-quality content ideas.

📦 User Dashboard – Manage your content history and purchased credits.

⚡ Modern Frontend – Built with Vite, React, and Tailwind CSS for speed.

☁️ Serverless Backend – Node.js + Express + Firestore for scalability.

🧩 Tech Stack
Layer	Technology
Frontend	React (Vite), Tailwind CSS, Firebase
Backend	Node.js, Express, Firestore
AI	OpenRouter API
Payments	Paystack
Hosting	Render (Backend), Vercel (Frontend)
⚙️ Environment Variables

Create .env files based on .env.example inside both the frontend/ and backend/ folders.

Frontend
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_API_BASE=
VITE_PAYSTACK_PUBLIC_KEY=

Backend
PORT=5000
FIREBASE_SERVICE_ACCOUNT_PATH=./serviceAccountKey.json
OPENROUTER_API_KEY=
OPENROUTER_MODEL=gpt-4o-mini
PAYSTACK_SECRET_KEY=
FRONTEND_BASE_URL=

🪄 How It Works

User signs up or logs in via Firebase.

Purchases credits using Paystack (test or live mode).

AI generates content via OpenRouter API.

User views or downloads generated scripts from their dashboard.

🌍 Deployment
Backend

Deploy to Render

Set environment variables under Environment → Variables

Upload Firebase service account as Secret File

Frontend

Deploy to Vercel

Set VITE_API_BASE to your backend Render URL

📸 Screenshots

(Add your screenshots here)
Example:




💡 Ideal For

🎥 YouTubers & Podcasters

💬 Influencers & Content Creators

✍️ Copywriters & Marketers

🤓 AI Enthusiasts & SaaS Builders

🧑‍💻 Author

Ameyaw Charles
Techpreneur • Developer • Digital Creator
🌐 https://dev.ameyawcharles.com

📧 icharlesameyaw@gmail.com

🪪 License

This project is licensed under the MIT License
.
Feel free to fork and build upon it — attribution appreciated!
