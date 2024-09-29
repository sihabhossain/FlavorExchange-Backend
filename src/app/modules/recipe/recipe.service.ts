import { IRecipe } from './recipe.interface';
import { Recipe } from './recipe.model';

const createRecipe = async (payload: IRecipe) => {
  const recipe = await Recipe.create(payload);

  return recipe;
};

const getAllRecipesFromDB = async () => {
  return await Recipe.find()
    .populate('userId', 'username')
    .sort({ createdAt: -1 });
};

const getRecipeByIdFromDB = async (id: string) => {
  return await Recipe.findById(id).populate('userId', 'username');
};

const updateRecipeInDB = async (id: string, data: Partial<IRecipe>) => {
  return await Recipe.findByIdAndUpdate(id, data, { new: true });
};

const deleteRecipeFromDB = async (id: string) => {
  return await Recipe.findByIdAndDelete(id);
};

export const RecipeServices = {
  createRecipe,
  getAllRecipesFromDB,
  getRecipeByIdFromDB,
  updateRecipeInDB,
  deleteRecipeFromDB,
};
