# Calculator Backend (NestJS)

This is the backend service for the Calculator application, built with **NestJS** and **MongoDB**.

It provides secure APIs to:
- Store calculator operation logs
- Fetch saved logs
- Delete logs (admin only)
- Handle authentication with JWT

---

## 🚀 Tech Stack

- NestJS
- MongoDB (Mongoose)
- JWT Authentication
- Body Parser (1MB limit)

---

## 📦 Features

- User authentication (login / signup)
- Role-based access (admin & user)
- Save calculation logs
- Read calculation logs
- Delete logs (admin only)
- CORS enabled for frontend

---

## ⚙️ Setup & Run

### 1. Install dependencies
```bash
npm install

Create a .env file:
MONGO_URI=mongodb://127.0.0.1:27017/calculator
JWT_SECRET=your_secret_key


## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```
