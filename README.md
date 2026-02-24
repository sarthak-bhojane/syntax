# 🚀 syntax-express

> CLI tool to generate production-ready Express.js boilerplate in seconds.

---

## 📌 Problem Statement

Starting a new Express.js project every time involves:

- Repeating folder structure setup
- Creating controllers, routes, services manually
- Writing database connection logic
- Installing dependencies
- Configuring middleware
- Fixing CommonJS / ES Module errors
- Maintaining consistency across projects

This wastes time and increases chances of structural mistakes.

---

## 💡 Solution

**syntax-express** is a CLI tool that instantly generates a clean, scalable, and industry-standard Express.js architecture with:

- MVC Pattern
- MongoDB integration (Mongoose)
- Route structure
- Controller layer
- Service layer
- Middleware setup
- Ready-to-run server configuration

All with a single command.

```bash
my-app/
├── src/
│   ├── config/            # Database configuration
│   ├── controllers/       # Route handlers
│   ├── middleware/        # Custom middleware
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── app.js             # Express app setup
│   └── server.js          # Entry point
├── package.json
└── node_modules/
```

## ⭐ Why This Is Better

✔ Clean MVC Architecture  
✔ Production-ready structure  
✔ Beginner-friendly  
✔ Works in Browser & Postman  
✔ Zero configuration required  
✔ MongoDB auto-connection  
✔ Proper modular separation  
✔ Avoids ES module errors  

---

## ⚡ Installation & Usage

### 1️⃣ Use via NPX (Recommended)

```bash
npx syntax-express folder-name
2️⃣After Installing syntax-express locally

Then run:
cd folder-name
cd src
node server.js


🧪 API Testing
🔹 In Postman

Method: POST
URL:
http://localhost:5000/api/users/login
Body → JSON
{
  "email": "test@gmail.com",
  "password": "123456"
}
Click Send



🔹 In Browser
Register
http://localhost:5000/api/users/register?name=Sarthak&email=test@gmail.com&password=123

Login
http://localhost:5000/api/users/login?email=test@gmail.com&password=123

🖥️ Root Endpoint
http://localhost:5000/

Response:
🚀 API is running...


📸 Screenshots
Server Running
Postman Login Success
Browser Register


🔧 Features
Express.js Setup
MongoDB (Mongoose)
Modular Architecture
Middleware Support
GET & POST support for browser & Postman
Ready for JWT integration
Clean and scalable structure

📦 Dependencies Installed
express
mongoose

🚀 Future Improvements
JWT Authentication
bcrypt password hashing
Environment variable support (.env)
Production configuration


👨‍💻 Author
Sarthak Bhojane
Full Stack Developer


📄 License
MIT License


💬 Contributing
Pull requests are welcome. For major changes, open an issue first to discuss what you would like to change.


🌟 Support
If you like this project:
⭐ Star the repository
🍴 Fork it
📢 Share it