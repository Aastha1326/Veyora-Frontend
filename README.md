🚀 Veyora Frontend

This repository contains the frontend application for Veyora, an AI-powered travel planning platform.
The frontend provides a modern, responsive user interface for trip planning, itinerary viewing, and user authentication.

🔧 Tech Stack

React.js
JavaScript (ES6+)
HTML5
CSS3
Axios
React Router

✨ Features

User registration & login UI
Protected routes for authenticated users
Dynamic trip and itinerary views
Responsive and modern UI design
API integration with Veyora backend
Modular component-based architecture


📁 Project Structure
frontend/
│── src/
│   ├── assets/        # Images and static assets
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page-level components
│   ├── App.js         # Root component
│   ├── index.js       # Entry point
│── public/
│── package.json
│── .gitignore


⚙️ Environment Variables
Create a .env file in the root directory and add:
REACT_APP_API_URL=http://localhost:3001
⚠️ .env files are ignored from version control for security reasons.


▶️ Run Locally
1️⃣ Clone the repository
git clone https://github.com/yourusername/Veyora-Frontend.git


2️⃣ Install dependencies
npm install


3️⃣ Start the development server
npm start

The app will run on:
http://localhost:3000

🔗 Backend Integration

This frontend consumes REST APIs from the Veyora Backend repository.
Ensure the backend server is running before using the application.


🚀 Future Enhancements

Improved UI/UX animations
OAuth / social login
Dark mode support
Deployment with CI/CD


👩‍💻 Author

Aastha Dua
B.Tech CSE Student


📌 Note

This frontend is part of the Veyora full-stack project.
Backend repository is maintained separately.
