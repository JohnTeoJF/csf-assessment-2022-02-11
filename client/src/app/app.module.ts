import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { RecipeListComponent } from './components/recipe-list.component';
import { RecipeDetailComponent } from './components/recipe-detail.component';
import { RecipeAddComponent } from './components/recipe-add.component';

const appRoutes: Routes = [
	{ path: '', component: RecipeListComponent },
	{
		path: 'recipe/:recipeId', component: RecipeDetailComponent,
	},
	{
		path: 'add', component: RecipeAddComponent,
	},
	{ path: '**', redirectTo: '/', pathMatch: 'full' }
]
@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeAddComponent
  ],
  imports: [
    BrowserModule,
	  FormsModule, ReactiveFormsModule,
	  RouterModule.forRoot(appRoutes)
  ],
  providers: [ RecipeService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
