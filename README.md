# 🎬 Cityflix — Global City Intelligence System

<div align="center">

![Cityflix Banner](https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80)

**A Netflix-inspired, real-time City Intelligence Agent combining autonomous AI with Human-in-the-Loop tool verification.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-city--flix.onrender.com-E50914?style=for-the-badge&logo=render&logoColor=white)](https://city-flix.onrender.com/)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![LangChain](https://img.shields.io/badge/LangChain-1.x-1C3C3C?style=for-the-badge&logo=chainlink&logoColor=white)](https://www.langchain.com/)
[![Groq](https://img.shields.io/badge/Groq-Inference-F55036?style=for-the-badge)](https://groq.com/)
[![Render](https://img.shields.io/badge/Render-Deployed-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://city-flix.onrender.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-red.svg?style=for-the-badge)](LICENSE)

<br/>

### 🌐 [Explore the Live Web App &rarr; https://city-flix.onrender.com/](https://city-flix.onrender.com/)

</div>

---

## 🌟 About Cityflix

**Cityflix** is an interactive, cinematic AI agent platform designed to deliver real-time global city intelligence wrapped in the familiar, immersive experience of the **Netflix streaming interface**. 

Whether you're tracking weather disruptions, discovering breaking regional news, or asking complex multimodal city questions, Cityflix bridges high-speed autonomous AI reasoning with complete user control.

### 🎯 Why Cityflix?

Most AI dashboards look like standard text chatbots. **Cityflix reimagines city exploration as an entertainment-grade streaming platform**:
- **Cinematic Discovery**: Explore cities through high-resolution billboards, match ratings, and horizontal poster carousels that zoom on hover.
- **Deep Real-Time Intelligence**: Connects to **OpenWeatherMap** for satellite-backed atmospheric readings and **Tavily AI Search** for live news crawling.
- **Safe & Controllable (Human-in-the-Loop)**: Rather than executing external API requests silently, Cityflix prompts you with Netflix-styled confirmation cards detailing the exact tool and parameters, putting you in direct control of every agent action.
- **Lightweight & High Performance**: Built with zero bulky UI frameworks—just pure, optimized Vanilla HTML5, CSS3, and JavaScript backed by a high-throughput Python backend.

---

### ✨ Key Features


- 🎭 **Netflix Cinematic UI**:
  - Dark-mode aesthetic (`#141414`) with Netflix Red (`#E50914`) accents.
  - Full-width hero billboard featuring dynamic city backdrops, match percentages, and live weather tags.
  - Horizontal poster carousels with smooth zoom-on-hover scaling for *Trending Global Hubs*, *Top News*, and *Weather Radar*.
- 🛰️ **Autonomous AI Agent**:
  - Powered by **Groq** (`openai/gpt-oss-120b`) via LangChain tools.
  - Real-time weather data fetched from **OpenWeatherMap**.
  - Verified news search & summaries powered by **Tavily**.
- 🛡️ **Human-in-the-Loop (HITL) Tool Approval**:
  - Before executing external tools, the agent presents a confirmation card with the tool name and exact parameters.
  - Users can approve or deny actions dynamically with immediate feedback.
- ⚡ **Zero-Framework Frontend**:
  - Pure HTML5, Vanilla CSS, and modern ES6 JavaScript.
  - Zero heavy frontend dependencies.
- 🚀 **One-Click Vercel Deployment**:
  - Ready for serverless deployment with `api/index.py` and `vercel.json`.

---

## 🏗️ Architecture

```
User Query (Frontend)
       │
       ▼
[ POST /api/chat ]  ──►  LangChain LLM (Groq)
                             │
                             ├─► Tool Required? ──► [ Approval Card (HITL) ]
                             │                            │
                             │                            ├─► [ Approve ] ──► Execute Tool
                             │                            └─► [ Deny ]    ──► Skip Tool
                             ▼                                      │
                    Final Synthesized Answer ◄──────────────────────┘
```

---

## 📁 Repository Structure

```plaintext
City_flix/
├── api/
│   └── index.py            # Vercel Python serverless function entrypoint
├── index.html              # Netflix UI billboard, carousels, and agent drawer
├── style.css               # Vanilla CSS design system & micro-animations
├── app.js                  # Client state, carousel logic & chat approval handler
├── server.py               # Local Python HTTP server with LangChain backend
├── Agents.py               # Terminal-based City Intelligence Agent implementation
├── requirements.txt        # Production dependencies for Vercel
├── vercel.json             # Vercel serverless routing configuration
├── .vercelignore           # Exclusions for Vercel builds
├── .gitignore              # Protected files (.env, .venv, cache)
└── README.md               # Project documentation
```

---

## 🚀 Quick Start (Local Setup)

### 1. Clone the Repository
```bash
git clone https://github.com/yoloaryan/City_flix.git
cd City_flix
```

### 2. Set Up Virtual Environment & Dependencies
```bash
python3 -m venv .venv
source .venv/bin/activate    # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Configure API Keys
Create a `.env` file in the project root:
```ini
GROQ_API_KEY="your_groq_api_key"
OPENWEATHER_API_KEY="your_openweather_api_key"
TAVILY_API_KEY="your_tavily_api_key"
```

> 🔑 **API Key Resources:**
> - [Groq Console](https://console.groq.com/keys) (Free)
> - [OpenWeatherMap](https://openweathermap.org/api) (Free Tier)
> - [Tavily AI](https://app.tavily.com/) (Free Tier)

### 4. Run the Web Application
```bash
python server.py
```
Open your browser and visit: **`http://localhost:8000`**

---

## ☁️ Deployment Options

### Option A: Deploy to Render (Recommended for continuous Python backend)

Deploy with a single click using the Render Blueprint:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/yoloaryan/City_flix)

Or manually:
1. Go to [dashboard.render.com](https://dashboard.render.com/) and click **New +** → **Web Service**.
2. Connect your GitHub repository `yoloaryan/City_flix`.
3. Set the configurations:
   - **Runtime:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `python server.py`
4. Under **Environment Variables**, add:
   - `GROQ_API_KEY`
   - `OPENWEATHER_API_KEY`
   - `TAVILY_API_KEY`
5. Click **Deploy Web Service**!

---

### Option B: Deploy to Vercel

1. Push your repository to GitHub.
2. Navigate to [vercel.com/new](https://vercel.com/new) and click **Import** next to **`City_flix`**.
3. Under **Environment Variables**, add:
   - `GROQ_API_KEY`
   - `OPENWEATHER_API_KEY`
   - `TAVILY_API_KEY`
4. Click **Deploy**. Vercel will automatically build the static assets and the serverless Python API!


---

## 📜 License

This project is licensed under the [MIT License](LICENSE).