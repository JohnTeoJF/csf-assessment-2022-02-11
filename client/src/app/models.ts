import { v4 as uuidv4 } from 'uuid';

export interface RecipeSummary{
  recipeId?: string
  title: string
}

export interface IngredientItem{
  ingredient: string
}

export interface Recipe extends RecipeSummary , IngredientItem {
	image: string
	instruction: string
  ingredients:IngredientItem[]

}
