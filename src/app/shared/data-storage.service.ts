import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http:HttpClient, private recSer:RecipeService) { }

  storeRecipes(){
    const recipes=this.recSer.getRecipe()
    this.http.put('https://recipebook-b7c7b-default-rtdb.firebaseio.com/recipes.json',recipes).subscribe(resp=>{
      console.log('recipes saved')
    })
  }

  fetchRecipes(){
    return this.http.get<Recipe[]>('https://recipebook-b7c7b-default-rtdb.firebaseio.com/recipes.json')
    .pipe(map(recipes=>{
      return recipes.map(recipe=>{
        return {...recipe,
        recIngredients:recipe.recIngredients?recipe.recIngredients:[]}
      })
    }), tap(recipes=>{
      this.recSer.setRecipes(recipes)
    })
    )
  }
}
