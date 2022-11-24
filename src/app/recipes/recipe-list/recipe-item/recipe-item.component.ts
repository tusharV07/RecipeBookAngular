import { Component, EventEmitter, Input, OnInit,Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input('fetchRecipe') recipe:Recipe
  @Input() index:number

  // @Output() recipeSelected=new EventEmitter<void>()

  constructor(private recipeSer:RecipeService) { }

  ngOnInit(): void {
  }

  // onSelected(){
  //   // this.recipeSelected.emit()
  //   this.recipeSer.recipeSelected.emit(this.recipe)
  // }

}
