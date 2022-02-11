import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { RecipeSummary } from "../models"


@Injectable()
export class RecipeService {

  constructor(private http: HttpClient) { }

  //url = "/"
  url = "http://localhost:8080/"

  //"http://localhost:8080/api/weather/${city}"
  //"/api/weather/${city}"

  //Ping server to GET all recipe summary
  getAllRecipes(): Promise<RecipeSummary> {
    console.log("Entered >> getAllReceipe()")
    return lastValueFrom(
      this.http.get<RecipeSummary>(this.url + `api/recipe`)
    )
  }

}
