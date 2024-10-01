// recipe.interface.ts
import { Document } from 'mongoose';

export interface IRating {
  userId: string;
  rating: number;
}

export interface IComment {
  id: string;
  userId: string;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRecipe extends Document {
  title: string;
  ingredients: string[];
  instructions: string;
  image?: string | null;
  userId: string;
  upvotes: number;
  downvotes: number;
  ratings: IRating[];
  comments: IComment[];
  createdAt: Date;
  averageRating?: number;
}
