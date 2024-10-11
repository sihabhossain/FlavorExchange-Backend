// recipe.model.ts
import mongoose, { Schema, model } from 'mongoose';
import { IRecipe } from './recipe.interface';

// Define the Rating schema
const RatingSchema = new Schema({
  userId: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
});

// Define the Comment schema
const CommentSchema = new Schema({
  id: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Define the Recipe schema
const RecipeSchema = new Schema<IRecipe>({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  image: { type: String, default: null },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  ratings: { type: [RatingSchema], default: [] },
  comments: { type: [CommentSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
  averageRating: { type: Number, default: null },
  category: { type: String },
});

// Create and export the Recipe model
const Recipe = model<IRecipe>('Recipe', RecipeSchema);
export default Recipe;
