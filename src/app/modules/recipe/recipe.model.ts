// recipe.model.ts
import mongoose, { Schema, model } from 'mongoose';
import { IRecipe } from './recipe.interface';

const RatingSchema = new Schema({
  userId: { type: String, required: true },
  rating: { type: Number, required: true },
});

const CommentSchema = new Schema({
  id: { type: String, required: true },
  userId: { type: String, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const RecipeSchema = new Schema<IRecipe>({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  image: { type: String, default: null },
  userId: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  ratings: { type: [RatingSchema], default: [] },
  comments: { type: [CommentSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
  averageRating: { type: Number, default: null },
});

// Create and export the Recipe model
const Recipe = model<IRecipe>('Recipe', RecipeSchema);
export default Recipe;
