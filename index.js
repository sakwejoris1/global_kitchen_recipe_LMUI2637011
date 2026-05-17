import 'dotenv/config';
import express from 'express';
import connectDB from './src/db/connection.js';
import recipeRoutes from './src/routes/recipe.routes.js';
import errorHandler from './src/middleware/errorHandler.js';

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware — parse incoming JSON bodies
app.use(express.json());

// Routes
app.use('/recipes', recipeRoutes);

// 404 handler for unknown routes
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler — must be last
app.use(errorHandler);

// Database connection
connectDB();

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
