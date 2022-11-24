import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingedient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredientsChanged=new EventEmitter<Ingredient[]>()
  startedEditing=new Subject<number>()

  private ingredients:Ingredient[]=[]

  constructor() { }

  getIngredients(){
    return this.ingredients.slice()
  }

  getIngredient(index:number){
    return this.ingredients[index]
  }

  addIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient)
    this.ingredientsChanged.emit(this.ingredients.slice())
  }

  updateIngredient(index:number,newIng:Ingredient){
    this.ingredients[index]=newIng
    this.ingredientsChanged.emit(this.ingredients.slice())
  }

  deleteIngredient(index:number){
    this.ingredients.splice(index,1)
    this.ingredientsChanged.emit(this.ingredients.slice())
  }

  addIngredients(ingredients:Ingredient[]){
    this.ingredients.push(...ingredients)
    this.ingredientsChanged.emit(this.ingredients.slice())
  }

  saveToStorage(ingredients:Ingredient[]){
    localStorage.setItem("ingsArray",JSON.stringify(ingredients))
  }
}
