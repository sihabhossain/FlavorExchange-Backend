export interface IRecipe {
  title: string;
  ingredients: string[];
  instructions: string;
  image?: string;
  userId: string;
  ratings?: number[];
  comments?: string[];
  createdAt?: Date;
}
