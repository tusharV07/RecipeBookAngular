import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingedient.model';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // recipeSelected=new EventEmitter<Recipe>()

  recipesChanged=new Subject<Recipe[]>()

  private recipes:Recipe[]=[]

  constructor() { }

  getRecipe(){
    return this.recipes.slice()
  }

  setRecipes(recipes:Recipe[]){
    this.recipes=recipes
    this.recipesChanged.next(this.recipes.slice())
  }

  getRecipeAtInd(index:number){
    return this.recipes[index]
  }

  addRecipe(newRecipe:Recipe){
    this.recipes.push(newRecipe)
    this.recipesChanged.next(this.recipes.slice())
    console.log(this.recipes)
  }

  updateRecipe(index:number,newRecipe:Recipe){
    // console.log(newRecipe)
    this.recipes[index]=newRecipe
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(index:number){
    this.recipes.splice(index,1)
    this.recipesChanged.next(this.recipes.slice())
  }
}
