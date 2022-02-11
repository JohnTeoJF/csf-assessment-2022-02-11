import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { lastValueFrom, Observable } from "rxjs";
import { Recipe, RecipeSummary } from "../models"

@Injectable()
export class RecipeService {

  constructor(private http: HttpClient) { }

  url ="http://localhost:8080/"
  //url = "/"

  //Ping server to GET all recipe summary
  getAllRecipes(): Promise<Recipe> {
    console.log("Entered >> getAllReceipe() to get summary")
    return lastValueFrom(
       this.http.get<Recipe>(this.url +`api/recipes`)
       )
  }

  //Get individual recipe
  getRecipe(recipeId:string): Promise<Recipe>{
    return lastValueFrom(
      this.http.get<Recipe>(this.url +'api/recipe/'+recipeId)
    )
  }

  //POST to server a new recipe
      uploadRecipe(recipe:Recipe): Promise<string>{

    console.log("Entered >> uploadRecipe()")
    const headers = { 'content-type': 'application/json'}


        return lastValueFrom(
          this.http.post<string>(this.url,recipe,{headers})
        )
      }



}
