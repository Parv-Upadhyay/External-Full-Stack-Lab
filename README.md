# Recipe App

A full-stack web application for managing recipes with user authentication.

## Features

- User registration and login
- CRUD operations for recipes
- Bootstrap for styling and client-side validation
- Passport.js for authentication
- File-based JSON database (no external DB required)

## Installation

1. Clone the repository.
2. Install dependencies: `npm install`
3. Start the server: `npm start` or `npm run dev` for development.

## Usage

- Register a new account at `/register`
- Login at `/login`
- View recipes at `/recipes`
- Add new recipes at `/recipes/new`
- Edit and delete your own recipes

## Routes

### User Routes
- GET /register
- POST /register
- GET /login
- POST /login
- GET /logout

### Recipe Routes
- GET /recipes
- GET /recipes/new
- POST /recipes
- GET /recipes/:id
- GET /recipes/:id/edit
- PUT /recipes/:id
- DELETE /recipes/:id

## Models

### User
- username (String, required, unique)
- password (String, required, hashed)
- fullName (String, required)
- country (String, required)
- dietaryPreference (String, required)

### Recipe
- dishName (String, required)
- ingredients (String, required)
- cookingTime (Number, required)
- difficulty (String, required)
- instructions (String, required)
- user (String, reference to User ID)