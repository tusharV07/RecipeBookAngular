import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  // selectedRecipe:Recipe

  constructor(private recipeSer:RecipeService) { }

  ngOnInit(): void {
    //we should subscribe to the event that is emitted in ngOnInit()
    // this.recipeSer.recipeSelected.subscribe((recipe:Recipe)=>{
    //   this.selectedRecipe=recipe
    // })
  }

}
