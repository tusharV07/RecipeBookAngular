import { Ingredient } from "../shared/ingedient.model";

export class Recipe{
    constructor(public name:string,public desc:string,public imagePath:string,public recIngredients:Ingredient[]){
    }
}