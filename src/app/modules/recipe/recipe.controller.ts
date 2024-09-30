import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RecipeServices } from './recipe.service';

const createRecipe = catchAsync(async (req, res) => {
  // Directly use the request body

  const recipe = await RecipeServices.createRecipe(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Recipe Created Successfully',
    data: recipe,
  });
});

const getAllRecipes = catchAsync(async (req, res) => {
  const recipes = await RecipeServices.getAllRecipesFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Recipes Retrieved Successfully',
    data: recipes,
  });
});

const getRecipeById = catchAsync(async (req, res) => {
  const recipe = await RecipeServices.getRecipeByIdFromDB(req.params.id);

  if (!recipe) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'Recipe not found',
      data: null,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Recipe Retrieved Successfully',
    data: recipe,
  });
});

const updateRecipe = catchAsync(async (req, res) => {
  // Use request body directly
  const recipe = await RecipeServices.updateRecipeInDB(req.params.id, req.body);

  if (!recipe) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'Recipe not found or not authorized',
      data: null,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Recipe Updated Successfully',
    data: recipe,
  });
});

const deleteRecipe = catchAsync(async (req, res) => {
  const recipe = await RecipeServices.deleteRecipeFromDB(req.params.id); // Ensure user authorization

  if (!recipe) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'Recipe not found or not authorized',
      data: null,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Recipe Deleted Successfully',
    data: null,
  });
});

export const RecipeControllers = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
