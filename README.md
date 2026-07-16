# Job Board Web Application

A full-stack Job Board web application built using **Spring Boot**, **React.js (Vite)**, and **MySQL Server**.

## Directory Structure
- `backend/` - Spring Boot (Maven) project.
- `frontend/` - React (Vite) project.
- `db/` - Database schemas and mock seeding scripts.

## Running the Application

### 1. Database Setup
Start your MySQL server and execute:
- `db/schema.sql` (Creates database and table)
- `db/seed.sql` (Inserts mock seed data)

### 2. Run Backend
Go to the `backend` directory and run:
```bash
mvn spring-boot:run
```
The REST APIs will run on [http://localhost:8080](http://localhost:8080).

### 3. Run Frontend
Go to the `frontend` directory and run:
```bash
npm install
npm run dev
```
The application will run on [http://localhost:5173](http://localhost:5173).
