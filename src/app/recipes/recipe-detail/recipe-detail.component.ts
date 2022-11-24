import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  // @Input() recipe:Recipe
  recipe:Recipe
  id:number

  constructor(private slSer:ShoppingListService,private recipeSer:RecipeService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>
    {
        this.id=+params['id']
        this.recipe=this.recipeSer.getRecipeAtInd(this.id)
    })

    
  }

  toShopList(event:Event){
    // console.log(event.target)
    // console.dir(event.target)
    this.slSer.addIngredients(this.recipe.recIngredients)
  }

  onDeleteRecipe(){
    this.recipeSer.deleteRecipe(this.id)
    this.router.navigate(['recipes'])
  }
  

}
