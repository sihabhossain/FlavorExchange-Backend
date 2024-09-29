import { Schema, model } from 'mongoose';
import { IRecipe } from './recipe.interface';

const recipeSchema = new Schema<IRecipe>(
  {
    title: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    userId: {
      type: String,
      required: true,
    },
    ratings: {
      type: [Number],
      default: [],
    },
    comments: {
      type: [String],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Recipe = model<IRecipe>('Recipe', recipeSchema);
