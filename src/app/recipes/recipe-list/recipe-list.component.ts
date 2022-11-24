import { outputAst } from '@angular/compiler';
import { Component, OnInit, Output ,EventEmitter, OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {

  // @Output() recipeWasSelected=new EventEmitter<Recipe>() 

  recipes:Recipe[];
  subscription:Subscription

  constructor(private recipeSer:RecipeService,private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.recipes=this.recipeSer.getRecipe()
    
    this.subscription=this.recipeSer.recipesChanged.subscribe(
      (recipes:Recipe[])=>{
        this.recipes=recipes
      }
    )
  }

  // onRecipeSelected(recipe:Recipe){
  //   this.recipeWasSelected.emit(recipe)
  // }

  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route})
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }

}
