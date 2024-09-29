import express from 'express';
import { RecipeControllers } from './recipe.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { RecipeValidation } from './recipe.validation';

const router = express.Router();

// Recipe Routes
export const RecipeRoutes = router;

// Create a new recipe (authenticated users)
router.post(
  '/',
  auth(USER_ROLE.USER), // Adjust role as needed
  validateRequest(RecipeValidation.createRecipeValidationSchema),
  RecipeControllers.createRecipe
);

// Get all recipes (public access)
router.get('/', RecipeControllers.getAllRecipes);

// Get a single recipe by ID (public access)
router.get('/:id', RecipeControllers.getRecipeById);

// Update a recipe by ID (authenticated users)
router.put(
  '/:id',
  auth(USER_ROLE.USER), // Adjust role as needed
  validateRequest(RecipeValidation.updateRecipeValidationSchema),
  RecipeControllers.updateRecipe
);

// Delete a recipe by ID (authenticated users)
router.delete(
  '/:id',
  auth(USER_ROLE.USER), // Adjust role as needed
  RecipeControllers.deleteRecipe
);
