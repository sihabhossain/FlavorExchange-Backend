import mongoose from 'mongoose';
import { IRecipe } from './recipe.interface';
import Recipe from './recipe.model';

// Create a new recipe
const createRecipe = async (payload: IRecipe) => {
  const recipe = await Recipe.create(payload);
  return recipe;
};

const getAllRecipesFromDB = async () => {
  const recipes = await Recipe.find()
    .populate('userId')
    .populate({
      path: 'comments.userId',
    })
    .sort({ upvotes: -1 }) // Sort by upvotes in descending order
    .exec();

  return recipes;
};

// Fetch recipes by user ID (My Recipes)
const getUserRecipesFromDB = async (userId: string) => {
  return await Recipe.find({ userId });
};

// Get a recipe by its ID
const getRecipeByIdFromDB = async (id: string) => {
  return await Recipe.findById(id)
    .populate('userId')
    .populate({
      path: 'comments.userId',
    })
    .exec();
};

// Update a recipe by its ID
const updateRecipeInDB = async (id: string, payload: Partial<IRecipe>) => {
  return await Recipe.findByIdAndUpdate(id, payload, { new: true });
};

// Delete a recipe by its ID
const deleteRecipeFromDB = async (id: string) => {
  return await Recipe.findByIdAndDelete(id);
};

// Upvote a recipe
const upvoteRecipe = async (id: string) => {
  return await Recipe.findByIdAndUpdate(
    id,
    { $inc: { upvotes: 1 } },
    { new: true }
  );
};

// Downvote a recipe
const downvoteRecipe = async (id: string) => {
  return await Recipe.findByIdAndUpdate(
    id,
    { $inc: { downvotes: 1 } },
    { new: true }
  );
};

// Rate a recipe
const rateRecipe = async (
  id: string,
  rating: { userId: string; rating: number }
) => {
  // Find the recipe by its ID
  const recipe = await Recipe.findById(id);
  if (!recipe) return null; // Return null if the recipe is not found

  // Initialize ratings array if not present
  recipe.ratings = recipe.ratings || [];

  // Check if the user has already rated the recipe
  const existingRatingIndex = recipe.ratings.findIndex(
    (r) => r.userId === rating.userId
  );

  if (existingRatingIndex > -1) {
    // If user has rated before, update the existing rating
    recipe.ratings[existingRatingIndex].rating = rating.rating;
  } else {
    // If user has not rated yet, add new rating to the array
    recipe.ratings.push(rating);
  }

  // Calculate the average rating
  const totalRatings = recipe.ratings.reduce(
    (sum, rate) => sum + rate.rating,
    0
  );
  const averageRating = totalRatings / recipe.ratings.length;

  // Update the average rating field in the recipe document
  recipe.averageRating = averageRating; // Ensure this field exists in your schema

  return await recipe.save(); // Save the updated recipe document
};

// Add a comment to a recipe
const addCommentToRecipe = async (
  recipeId: string,
  commentData: { userId: string; comment: string }
) => {
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) return null;

  const newComment = {
    id: new mongoose.Types.ObjectId().toString(),
    userId: commentData.userId,
    comment: commentData.comment,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  recipe.comments.push(newComment);
  return await recipe.save();
};

const editCommentInRecipe = async (
  recipeId: string,
  commentId: string,
  updatedComment: string,
  userId: string
) => {
  // Find the recipe by ID
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    throw new Error('Recipe not found');
  }

  // Find the comment by its ID
  const comment = recipe.comments.find((c) => c.id.toString() === commentId);

  if (!comment) {
    throw new Error('Comment not found');
  }

  // Ensure the comment belongs to the user
  if (comment.userId.toString() !== userId) {
    throw new Error('User not authorized to edit this comment');
  }

  // Update the comment
  comment.comment = updatedComment; // Ensure updatedComment contains `comment`
  comment.updatedAt = new Date();

  // Save the recipe with the updated comment
  return await recipe.save();
};

// Delete a comment from a recipe
const deleteCommentFromRecipe = async (
  recipeId: string,
  commentId: string,
  userId: string
) => {
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    throw new Error('Recipe not found'); // Throw an error if the recipe doesn't exist
  }

  const commentIndex = recipe.comments.findIndex((c) => c.id === commentId); // Get the index of the comment
  if (commentIndex === -1) {
    throw new Error('Comment not found'); // Throw an error if the comment doesn't exist
  }

  const comment = recipe.comments[commentIndex];
  if (comment.userId.toString() !== userId) {
    throw new Error('User not authorized to edit this comment'); // User authorization check
  }

  recipe.comments.splice(commentIndex, 1); // Remove the comment from the array
  await recipe.save(); // Save the updated recipe
  return recipe; // Return the updated recipe
};

// Export the RecipeServices
export const RecipeServices = {
  createRecipe,
  getAllRecipesFromDB,
  getRecipeByIdFromDB,
  updateRecipeInDB,
  deleteRecipeFromDB,
  upvoteRecipe,
  downvoteRecipe,
  rateRecipe,
  addCommentToRecipe,
  editCommentInRecipe,
  deleteCommentFromRecipe,
  getUserRecipesFromDB,
};
