<div align="center">

# 🎬 Movie Review Web App  
### A Full-Stack CRUD Application for Movie Reviews  

🚀 **Node.js + Express + MongoDB + Vanilla JS**  
💬 Add • ✏️ Edit • 🗑️ Delete • 🔄 View Reviews Instantly  

</div>

---

## ✨ Features
- 🔍 View all reviews for a movie  
- 💬 Add new reviews  
- ✏️ Edit existing ones inline  
- 🗑️ Delete instantly  
- ⚡ Dynamic, no page reloads  

---

## 🏗️ Project Structure
movie-review/
├── backend/ # Node + Express + MongoDB
├── frontend/ # HTML, CSS, JS
└── README.md

yaml
Copy code

---

## ⚙️ Setup

### 🔧 Backend
```bash
cd backend
npm install
npm start
Set your MongoDB URI:

js
Copy code
const uri = "mongodb+srv://<user>:<pass>@cluster0.mongodb.net/moviesDB";
Runs at → http://localhost:8000/api/v1/reviews/

💻 Frontend
Open frontend/index.html in browser (or use VSCode Live Server).
Update script.js:

js
Copy code
const Apilink = "https://movie-review-api.onrender.com/api/v1/reviews/";
🌐 Deployment:"https://moviereviewshubh.netlify.app/"

🌍 Frontend: Netlify

🧠 Tech Stack
Layer	Technology
Frontend	HTML, CSS, JavaScript
Backend	Node.js, Express
Database	MongoDB Atlas
Auth	JWT (Bearer Token)
Hosting	Render + Netlify

<div align="center">
💖 Developed by Shubhanshi Gupta

</div> 
