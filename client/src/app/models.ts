export interface RecipeSummary {
	recipeId: string
	title: string
}

export interface Recipe extends RecipeSummary {
	image: string
	instruction: string
	ingredients: string []
}

export interface Guard {
	evaluate(): boolean
}
