# 🌤️ WeatherApp – MERN Stack

A full-stack weather application built with the MERN stack. Search real-time weather for any city, with user authentication and search history.

## ✨ Features

- 🔍 Search real-time weather for any city
- 🔐 User Register / Login with JWT Authentication
- 📜 Save and view recent search history (logged-in users)
- 🗑️ Clear search history
- 🎨 Dynamic weather card background based on weather condition
- 📱 Fully responsive design

## 🛠️ Tech Stack

**Frontend:** React, Tailwind CSS, React Router, Axios  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Auth:** JWT (JSON Web Tokens), bcryptjs  
**API:** OpenWeatherMap API

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Fill in your values in .env
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 🔑 Environment Variables

Create a `.env` file in the `backend/` folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPENWEATHER_API_KEY=your_openweathermap_api_key
```

### Get API Keys
- **MongoDB:** [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas) (Free tier)
- **OpenWeatherMap:** [openweathermap.org/api](https://openweathermap.org/api) (Free tier)

## 📁 Project Structure

```
weather-app/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
└── frontend/
    └── src/
        ├── components/
        ├── context/
        └── pages/
```

## 👨‍💻 Author

**Naman Goel** – [GitHub](https://github.com/Naman105) | [LinkedIn](https://www.linkedin.com/in/namangoel08/)
