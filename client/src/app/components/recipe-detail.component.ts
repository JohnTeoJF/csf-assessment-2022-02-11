import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../models';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {


  recipe!: Recipe
  id = ''

  constructor(private activatedRoute: ActivatedRoute, private recipeSvc: RecipeService) { }

  ngOnInit(): void {


    this.id = this.activatedRoute.snapshot.params['recipeId']
    console.info("recipeId is >> " +this.id)
    this.recipeSvc.getRecipe(this.id)
    .then(result=>{
      this.recipe=result
      console.info(this.recipe)
    })
    .catch(error=>{
      console.info(error.error)
    })
  }

}
