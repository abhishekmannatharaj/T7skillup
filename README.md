# T7skillupAI 🚀

> **AI-Powered Campus Placement Support & Skill Tracking Platform**

T7skillupAI is a comprehensive career mentoring platform designed to help engineering students transition from college to top-tier placements. By combining tailored learning roadmaps, AI-driven mock interviews, and automated YouTube skill tracking, T7skillupAI ensures that every hour spent learning translates into measurable professional progress.

---

## 🌟 Key Features

### 1. 🗺️ AI-Generated Learning Roadmaps
- Input your current skills and target role (e.g., Frontend Developer, Data Scientist).
- The platform uses **Google Gemini 2.0 Flash** to analyze your skill gaps against real industry requirements.
- Generates a brutally honest readiness score and a week-by-week actionable roadmap with specific free resources.

### 2. 📝 Integrated ATS Resume Tester
- Test your resume directly inside your dashboard against your target role.
- Instantly receive an ATS score, formatting feedback, and a list of missing keywords to ensure your resume beats the screening software.

### 3. 🎥 YouTube Skill Tracker (Chrome Extension)
- A companion Chrome extension that turns YouTube into a structured learning environment.
- **Smart Tracking:** Analyzes educational videos you watch and automatically extracts the core technical skills.
- **Auto-Sync:** Push learned skills directly to your T7skillup portfolio with a single click using your unique `T7 Account ID`.
- **Search Scoring:** Overlays a "Relevance Score" on YouTube search results based on your personal learning goals.

### 4. 🤖 "T7 SKILL_BOT" Companion
- An interactive, context-aware AI tutor built right into the dashboard and extension.
- Ask questions, request summaries, or get coding challenges related to whatever you are currently studying.

---

## 🛠️ Technology Stack

- **Frontend:** React.js, Tailwind CSS, Vite
- **AI Integration:** Google Gemini API (`gemini-2.0-flash`)
- **Backend/Database:** Firebase Authentication & Firestore
- **Extension:** Manifest V3, Chrome APIs
- **Icons:** Lucide React

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase Account (for database and auth)
- Google Gemini API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/BLITZz-bot/T7skillupAI.git
   cd T7skillupAI
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add your keys:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   *The application will be available at `http://localhost:3000` (or your configured Vite port).*

---

## 🧩 Chrome Extension Setup

1. Open Chrome and go to `chrome://extensions/`.
2. Enable **"Developer mode"** in the top right corner.
3. Click **"Load unpacked"** and select the `/T7-extension` folder located inside this repository.
4. Open the extension settings, enter your **T7 Account ID** (found on your web dashboard) and your Gemini API Key.
5. Watch a tutorial on YouTube and click the extension to sync your learning!

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/BLITZz-bot/T7skillupAI/issues).

---

## 📄 License
This project is licensed under the MIT License.
