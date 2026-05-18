import { recipeService } from '../services/recipe.service.js';

// GET /recipes
const getAllRecipes = async (req, res, next) => {
    try {
        const { category } = req.query;
        const recipes = await recipeService.getAllRecipes(category);
        res.status(200).json({
            success: true,count: recipes.length, data: recipes,
        });
    } catch (err) {
        next(err);
    }
};

// GET /recipes/:id
const getRecipeById = async (req, res, next) => {
    try {
        const recipe = await recipeService.getRecipeById(req.params.id);

        if (!recipe) {
            const error = new Error('Recipe not found');
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({
            success: true,
            data: recipe,
        });
    } catch (err) {
        next(err);
    }
};

// POST /recipes
const createRecipe = async (req, res, next) => {
    try {
        const newRecipe = await recipeService.createRecipe(req.body);
        res.status(201).json({
            success: true,
            data: newRecipe,
        });
    } catch (err) {
        next(err);
    }
};

// PATCH /recipes/:id
const updateRecipe = async (req, res, next) => {
    try {
        const updatedRecipe = await recipeService.updateRecipe(req.params.id, req.body);

        if (!updatedRecipe) {
            const error = new Error('Recipe not found');
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({
            success: true,
            data: updatedRecipe,
        });
    } catch (err) {
        next(err);
    }
};

// DELETE /recipes/:id
const deleteRecipe = async (req, res, next) => {
    try {
        const deletedRecipe = await recipeService.deleteRecipe(req.params.id);

        if (!deletedRecipe) {
            const error = new Error('Recipe not found');
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({
            success: true,
            message: 'Recipe deleted successfully',
        });
    } catch (err) {
        next(err);
    }
};

export const recipeController = {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
};
