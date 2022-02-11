import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe,RecipeSummary } from '../models';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

	constructor(private recipeSvc: RecipeService, private router: Router) { }

  recipeList: RecipeSummary[]=[]

  ngOnInit(): void {
    console.log("Entered nginit of recipelist")
      this.recipeSvc.getAllRecipes()
    //    .then(t => this.recipeList = t);
    }

  }

   // console.log("Received all recipes")


