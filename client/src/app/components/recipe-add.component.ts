import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { IngredientItem, Recipe } from '../models';
import {Router} from '@angular/router';

import { RecipeService } from '../services/recipe.service';



@Component({
  selector: 'app-recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.css']
})

export class RecipeAddComponent implements OnInit {


  recipeForm!: FormGroup
  ingredientItemsArrray!: FormArray

  @Input()
  //recipe: Partial<Recipe> = {}

  recipe: Partial<Recipe> = {
    title: 'Apple pie',
    image: 'abc.jpg',
    instruction: 'Cut the apples',
    ingredients: [
      { ingredient: 'apple' },
      { ingredient: 'dough' },
    ]
  }

  @Output()
  onAddRecipe = new Subject<Recipe>()

  constructor(private fb: FormBuilder, private router: Router,private recipeSvc: RecipeService) { }

  ngOnInit(): void {
    this.setForm(this.recipe)
    this.ingredientItemsArrray = this.recipeForm.get('ingredients') as FormArray
  }

  setForm(o: Partial<Recipe>) {
    this.recipeForm = this.createRecipeForm(o)
  }

  private createLineItem(li: Partial<IngredientItem> = {}): FormGroup {
    return this.fb.group({
      ingredient: this.fb.control(li?.ingredient || '', [ Validators.minLength(3), Validators.required ]),
     })
  }

  private createLineItems(li: IngredientItem[] = []): FormArray {
    const lis = this.fb.array([], [ Validators.minLength(1) ])
    for (let l of li)
      lis.push(this.createLineItem(l))
    return lis
  }

  private createRecipeForm(recipe: Partial<Recipe> = {}): FormGroup {
    return this.fb.group({
      title: this.fb.control(recipe?.title || '', [ Validators.minLength(3), Validators.required ]),
      image: this.fb.control(recipe?.image || '', [ Validators.required ]),
      instruction: this.fb.control(recipe?.instruction || '', [ Validators.minLength(3), Validators.required ]),
     ingredients: this.createLineItems(recipe?.ingredients)
    })
  }

  addLineItem() {
    this.ingredientItemsArrray.push(this.createLineItem())
  }
  deleteLineItem(i: number) {
    this.ingredientItemsArrray.removeAt(i)
  }

  uploadRecipe() {

    if (!this.isValid()) {
      alert('Your recipe is invalid')
      return
    }

    console.log("Form valid and clicked on Add Recipe")
    const recipe = this.recipeForm.value as Recipe
    this.recipeForm = this.createRecipeForm();
    this.ingredientItemsArrray = this.recipeForm.get('ingredients') as FormArray
    this.onAddRecipe.next(recipe)

    console.log("payload is >> "+recipe)

    this.back()
  }

  isValid() {
    return this.recipeForm.valid && (this.ingredientItemsArrray.length > 0)
  }

	back() {
		this.router.navigate(['/'])
	}

}
