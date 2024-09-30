import { z } from 'zod';

// Base recipe schema for shared validations
const baseRecipeSchema = z.object({
  title: z.string().nonempty('Title is required'),
  ingredients: z.array(z.string()).nonempty('Ingredients are required'),
  instructions: z.string().nonempty('Instructions are required'),
  image: z
    .string()
    .optional()
    .refine((url) => !url || /^(ftp|http|https):\/\/[^ "]+$/.test(url), {
      message: 'Image must be a valid URL',
    }),
  userId: z.string().nonempty('User ID is required'),
  ratings: z.array(z.number().min(1).max(5)).optional(),
  comments: z.array(z.string()).optional(),
  createdAt: z
    .preprocess(
      (value) => (typeof value === 'string' ? new Date(value) : value),
      z.date()
    )
    .optional(),
});

// Create recipe validation schema
const createRecipeValidationSchema = z.object({
  body: baseRecipeSchema,
});

// Update recipe validation schema (making all fields optional)
const updateRecipeValidationSchema = z.object({
  body: baseRecipeSchema.partial(),
});

export const RecipeValidation = {
  createRecipeValidationSchema,
  updateRecipeValidationSchema,
};
