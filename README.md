# T7skillup: AI-Driven Career Bridge 🎓

**Empowering students to transition from campus learning to industry-ready professionals through semantic gap analysis.**

![Vite](https://img.shields.io/badge/Vite-5.x-yellow)
![React](https://img.shields.io/badge/React-18.x-blue)
![Firebase](https://img.shields.io/badge/Backend-Firebase-orange)
![Gemini](https://img.shields.io/badge/AI-Gemini_Pro-purple)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan)

---

## 💡 The Problem
A significant "readiness gap" exists between academic curriculum and industry requirements. Students often struggle to identify which specific technical competencies they lack, while campus placement cells find it difficult to provide personalized data-driven guidance to thousands of students at scale.

## 🚀 The T7 Solution
**T7skillup** leverages the **Google Gemini Pro** model to provide real-time, personalized skill auditing. By performing semantic comparisons between a student's current profile and evolving industry benchmarks, the platform generates a custom-tailored roadmap to employability.

---

## ✨ Core Features

* **🤖 Semantic AI Analysis:** Deep-scanning of user skills against targeted job roles using Generative AI.
* **📈 Readiness Scoring:** Visual breakdown of current standing vs. industry expectations.
* **🛤️ Dynamic Roadmaps:** Automated generation of learning paths to bridge identified gaps.
* **👨‍💼 Placement Cell Analytics:** Admin dashboard for colleges to track campus-wide trends and skill deficits.
* **🔐 Secure Auth:** Role-based access control (Student/Admin) powered by Firebase.

---

## 🏗️ Technical Architecture

| Component | Technology |
| :--- | :--- |
| **Frontend** | React 18 (Vite) |
| **Styling** | Tailwind CSS |
| **Database/Auth** | Firebase (Firestore + Authentication) |
| **AI Engine** | Google Gemini API (Generative AI SDK) |
| **Icons** | Lucide React |

---

## ⚙️ Local Setup & Configuration

### 1. Prerequisites
* **Node.js** (v18 or higher)
* **Firebase Project** (Auth & Firestore enabled)
* **Gemini API Key** (from Google AI Studio)

### 2. Installation
```bash
# Clone the repository
git clone [https://github.com/your-username/T7skillup.git](https://github.com/your-username/T7skillup.git)

# Enter the directory
cd T7skillup

# Install dependencies
npm install
3. Environment Variables
Create a .env file in the root directory:

Code snippet
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=t7skillup-db.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=t7skillup-db
VITE_FIREBASE_STORAGE_BUCKET=t7skillup-db.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GEMINI_API_KEY=your_gemini_pro_api_key

4. Run Development Server
Bash
npm run dev




Demonstration Flow
Landing: Overview of the skill gap problem.

Onboarding: Student registration and profile setup.

Analysis: Selecting a career path (e.g., "DevOps Engineer") and triggering the Gemini AI audit.

Action: Reviewing the generated roadmap and readiness score.

Admin: Switching to the Placement Cell view to see aggregated campus statistics.