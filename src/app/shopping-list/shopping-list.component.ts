import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingedient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients:Ingredient[];

  constructor(private slSer:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients=this.slSer.getIngredients()
    if(localStorage.getItem("ingsArray") && this.ingredients.length===0){
      const myArr=JSON.parse(localStorage.getItem("ingsArray"))
      this.ingredients=myArr
      this.slSer.addIngredients(myArr)
      
    }


    this.slSer.ingredientsChanged.subscribe((ingredients:Ingredient[])=>
    {
      this.ingredients=ingredients
      this.slSer.saveToStorage(ingredients)
    })
  }

  onEditItem(i:number){
    this.slSer.startedEditing.next(i)
  }

  // onIngredientAdded(ingredient:Ingredient){
  //   this.ingredients.push(ingredient)
  // }

}
