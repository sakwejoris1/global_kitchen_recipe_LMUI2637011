# The Global Kitchen API

A backend RESTful API for managing a digital cookbook — built with Node.js, Express, and MongoDB.

## Tech Stack

- **Runtime:** Node.js v20+
- **Framework:** Express.js v5
- **Database:** MongoDB (Local or Atlas)
- **ODM:** Mongoose v9
- **Configuration:** dotenv

## Features

- Full CRUD for recipes (GET / POST / PATCH / DELETE)
- Category filtering via `?category=` query parameter
- Schema-level validation (required, min, enum, trim)
- MongoDB indexes on `category` and `title` for fast lookups
- Single DRY database connection module
- Global error handler with descriptive HTTP status codes
- Async/Await non-blocking I/O throughout
- Environment-based configuration via `.env`

## Project Structure

```
global-kitchen/
├── index.js                        # Entry point
├── package.json
├── .env                            # Environment variables (not committed)
├── .env.example                    # Safe template to commit
├── .gitignore
└── src/
    ├── db/
    │   └── connection.js           # Single DB connection module
    ├── models/
    │   └── recipe.model.js         # Mongoose schema + indexes
    ├── services/
    │   └── recipe.service.js       # Business logic
    ├── controllers/
    │   └── recipe.controller.js    # Request / response cycle
    ├── routes/
    │   └── recipe.routes.js        # API endpoint definitions
    └── middleware/
        └── errorHandler.js         # Global error handler
```

## API Endpoints

| Method   | Endpoint        | Description                              |
|----------|-----------------|------------------------------------------|
| GET      | /recipes        | Get all recipes (supports ?category=)    |
| POST     | /recipes        | Create a new recipe                      |
| GET      | /recipes/:id    | Get a single recipe by ID                |
| PATCH    | /recipes/:id    | Update specific fields of a recipe       |
| DELETE   | /recipes/:id    | Delete a recipe                          |

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone [your-repo-url]
   cd global-kitchen
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/globalKitchenDB
   ```

4. Start the server:
   ```bash
   # Production
   npm start

   # Development (auto-restart)
   npm run start-dev
   ```

## Example Request Body (POST /recipes)

```json
{
  "title": "Jollof Rice",
  "ingredients": ["rice", "tomatoes", "onions", "pepper", "chicken stock"],
  "instructions": "Blend tomatoes and pepper. Fry the paste, add stock and rice. Cook until done.",
  "cookingTime": 45,
  "difficulty": "Medium",
  "category": "West African"
}
```

## Example Response

```json
{
  "success": true,
  "data": {
    "_id": "664a1f...",
    "title": "Jollof Rice",
    "ingredients": ["rice", "tomatoes", "onions", "pepper", "chicken stock"],
    "instructions": "Blend tomatoes and pepper...",
    "cookingTime": 45,
    "difficulty": "Medium",
    "category": "West African",
    "createdAt": "2026-05-17T10:00:00.000Z",
    "updatedAt": "2026-05-17T10:00:00.000Z"
  }
}
```
