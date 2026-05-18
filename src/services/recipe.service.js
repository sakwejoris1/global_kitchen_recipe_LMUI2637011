import mongoose from 'mongoose';
import { Recipe } from '../models/recipe.model.js';

const validateObjectId = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error('Invalid recipe ID');
        error.statusCode = 400;
        throw error;
    }
};

// get all cooking recipe
const getAllRecipes = async (category) => {
    const filter = category ? { category } : {};
    const recipes = await Recipe.find(filter);
    return recipes;
};

// Retrieve a single recipe by ID
const getRecipeById = async (id) => {
    validateObjectId(id);
    const recipe = await Recipe.findById(id);
    return recipe;
};

// Create a new recipe - business rule  cookingTime must be a positive number
const createRecipe = async (recipeData) => {
    const { cookingTime } = recipeData;

    if (!cookingTime || cookingTime < 1) {
        const error = new Error('Cooking time must be a positive number');
        error.statusCode = 400;
        throw error;
    }

    const newRecipe = new Recipe(recipeData);
    const savedRecipe = await newRecipe.save();
    return savedRecipe;
};

// Update specific fields of an existing recipe
const updateRecipe = async (id, updateData) => {
    validateObjectId(id);

    if (updateData.cookingTime !== undefined && updateData.cookingTime < 1) {
        const error = new Error('Cooking time must be a positive number');
        error.statusCode = 400;
        throw error;
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    );
    return updatedRecipe;
};

// Remove a recipe by ID
const deleteRecipe = async (id) => {
    validateObjectId(id);
    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    return deletedRecipe;
};

export const recipeService = {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
};
