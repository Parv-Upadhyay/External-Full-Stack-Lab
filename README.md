# RecipeHub — Full-Stack Recipe Manager

RecipeHub is a full-stack recipe-sharing application built with Node.js and Express. It provides user authentication and allows users to create, view, edit, and manage recipes through a responsive server-rendered interface.

## Features

- User registration and login
- Secure bcrypt password hashing
- Passport.js authentication
- Create, view, edit, and delete recipes
- Recipe ownership protection
- Flash success and error messages
- Search and difficulty filtering
- Responsive Bootstrap interface
- MongoDB or LowDB data storage

## Tech Stack

- Node.js
- Express.js
- EJS
- Passport.js
- MongoDB / Mongoose
- bcryptjs
- Bootstrap 5
- Express Session
- Method Override
- LowDB

## Project Structure

```text
app.js
db.js
models/       Database and application models
routes/       Authentication and recipe routes
middleware/   Login and authorization checks
views/        EJS layouts and templates
public/       Stylesheets and browser assets
```

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm
- MongoDB, or the included LowDB JSON datastore

### Installation

```bash
git clone https://github.com/Parv-Upadhyay/External-Full-Stack-Lab.git
cd External-Full-Stack-Lab
npm install
```

### Environment Variables

Create a `.env` file:

```env
PORT=3000
SESSION_SECRET=replace-with-a-long-random-string
MONGODB_URI=mongodb://127.0.0.1:27017/recipehub
```

For MongoDB Atlas, use your database connection string as `MONGODB_URI`.

### Run Locally

```bash
npm run dev
```

Open `http://localhost:3000`.

### Production

```bash
npm start
```

Set `SESSION_SECRET` and `MONGODB_URI` as environment variables on the hosting platform.

## Core Routes

| Method | Route | Description |
|---|---|---|
| `GET` | `/` | Redirect to recipes |
| `GET` | `/recipes` | List recipes |
| `GET` | `/recipes/new` | Recipe creation form |
| `POST` | `/recipes` | Create a recipe |
| `GET` | `/recipes/:id` | Recipe details |
| `GET` | `/recipes/:id/edit` | Recipe editing form |
| `PUT` | `/recipes/:id` | Update a recipe |
| `DELETE` | `/recipes/:id` | Delete a recipe |
| `GET` | `/register` | Registration form |
| `POST` | `/register` | Register a user |
| `GET` | `/login` | Login form |
| `POST` | `/login` | Authenticate a user |
| `GET` | `/logout` | Log out |

## Security Notes

- Never commit real session secrets or database credentials
- Use a strong, unique `SESSION_SECRET`
- Restrict MongoDB Atlas network access
- Keep npm dependencies updated
- Enable CSRF protection in production
- Use HTTPS and secure session cookies in deployment

## Deployment

1. Create a MongoDB Atlas free cluster.
2. Create a database user and obtain the connection string.
3. Add `MONGODB_URI` and `SESSION_SECRET` as deployment environment variables.
4. Configure the deployment start command as `npm start`.
5. Push the repository to the deployment provider.

## Future Improvements

- Recipe images
- Categories and dietary tags
- Ratings and reviews
- Favorites
- Pagination
- Password reset
- Unit and integration tests
- Profile pages
- Shopping lists
- Recipe sharing
- GitHub Actions CI

## Contributing

Pull requests are welcome. Open an issue before proposing substantial architectural or feature changes.

## License

A license may be added before public distribution.
