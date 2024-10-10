import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RecipeServices } from './recipe.service';
import AppError from '../../errors/AppError';

const createRecipe = catchAsync(async (req: Request, res: Response) => {
  const recipe = await RecipeServices.createRecipe(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Recipe created successfully',
    data: recipe,
  });
});

const getAllRecipes = catchAsync(async (req: Request, res: Response) => {
  const recipes = await RecipeServices.getAllRecipesFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Recipes fetched successfully',
    data: recipes,
  });
});

const getMyRecipes = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params?.id;

  if (!userId) {
    throw new AppError(400, 'User not found or invalid token');
  }

  const recipes = await RecipeServices.getUserRecipesFromDB(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Recipes fetched successfully',
    data: recipes,
  });
});

const getRecipeById = catchAsync(async (req: Request, res: Response) => {
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
    message: 'Recipe fetched successfully',
    data: recipe,
  });
});

const updateRecipe = catchAsync(async (req: Request, res: Response) => {
  const recipe = await RecipeServices.updateRecipeInDB(req.params.id, req.body);
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
    message: 'Recipe updated successfully',
    data: recipe,
  });
});

const deleteRecipe = catchAsync(async (req: Request, res: Response) => {
  const recipe = await RecipeServices.deleteRecipeFromDB(req.params.id);
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
    message: 'Recipe deleted successfully',
    data: recipe,
  });
});

const upvoteRecipe = catchAsync(async (req: Request, res: Response) => {
  const recipe = await RecipeServices.upvoteRecipe(req.params.id);
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
    message: 'Recipe upvoted successfully',
    data: recipe,
  });
});

const downvoteRecipe = catchAsync(async (req: Request, res: Response) => {
  const recipe = await RecipeServices.downvoteRecipe(req.params.id);
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
    message: 'Recipe downvoted successfully',
    data: recipe,
  });
});

const rateRecipe = catchAsync(async (req: Request, res: Response) => {
  const ratingData = req.body; // Expecting { userId: string, rating: number }
  const recipe = await RecipeServices.rateRecipe(req.params.id, ratingData);
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
    message: 'Recipe rated successfully',
    data: recipe,
  });
});

// Add a comment to a recipe
const addCommentToRecipe = catchAsync(async (req: Request, res: Response) => {
  const commentData = req.body;
  const recipe = await RecipeServices.addCommentToRecipe(
    req.params.id,
    commentData
  );
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
    message: 'Comment added successfully',
    data: recipe,
  });
});

const editCommentInRecipe = catchAsync(async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const updatedComment = req.body.updatedComment;
  const userId = req.body.userId;

  try {
    const recipe = await RecipeServices.editCommentInRecipe(
      req.params.id,
      commentId,
      updatedComment,
      userId
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Comment updated successfully',
      data: recipe,
    });
  } catch (error: any) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.BAD_REQUEST,
      message: error.message, // Send the error message to the client
      data: null,
    });
  }
});

// Delete a comment from a recipe
const deleteCommentInRecipe = catchAsync(
  async (req: Request, res: Response) => {
    const { commentId } = req.params; // Extract commentId from request parameters
    const userId = req.body.userId; // Assuming userId is sent in the request body

    try {
      const recipe = await RecipeServices.deleteCommentFromRecipe(
        req.params.id, // recipeId
        commentId,
        userId
      );

      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Comment deleted successfully',
        data: recipe,
      });
    } catch (error: any) {
      // Handle different error messages based on the caught error
      console.error(error.message); // Log error for debugging
      sendResponse(res, {
        success: false,
        statusCode: httpStatus.NOT_FOUND, // Return NOT_FOUND if the recipe or comment isn't found
        message: error.message,
        data: null,
      });
    }
  }
);

export const RecipeControllers = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  upvoteRecipe,
  downvoteRecipe,
  rateRecipe,
  addCommentToRecipe,
  editCommentInRecipe,
  deleteCommentInRecipe,
  getMyRecipes,
};
