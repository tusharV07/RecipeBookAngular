import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id:number
  editMode:boolean=false
  recipeForm:FormGroup

  constructor(private route:ActivatedRoute,private rSer:RecipeService,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>
    {
      this.id=+params['id']
      this.editMode=params['id']!=null
      this.initForm()
    })
  }
  
  //to pass recipeForm.value instead of Recipe object, the NAMES and ORDER of controls in recipeForm:FormGroup should be same as Recipe Model constructor parameters
  onSubmit(){
    if(this.editMode){
      this.rSer.updateRecipe(this.id,this.recipeForm.value)
    }else{
      this.rSer.addRecipe(this.recipeForm.value)
    }

    this.onCancel()
  }

  private initForm(){
    let recName=''
    let imagePath=''
    let desc=''
    let recIngreds= new FormArray([])

    if(this.editMode){
      const recipe=this.rSer.getRecipeAtInd(this.id)
      recName=recipe.name
      imagePath=recipe.imagePath
      desc=recipe.desc
      if(recipe['recIngredients']){
        for(let ingred of recipe.recIngredients){
          recIngreds.push(
            new FormGroup({
              'name':new FormControl(ingred.name,Validators.required),
              'amount':new FormControl(ingred.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }

    this.recipeForm=new FormGroup({
      'name': new FormControl(recName,Validators.required),
      'desc':new FormControl(desc,Validators.required),
      'imagePath':new FormControl(imagePath,Validators.required),
      'recIngredients':recIngreds
    }
    )

  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('recIngredients')).push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'amount':new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('recIngredients')).removeAt(index)
  }

  get controls(){
    return (<FormArray>this.recipeForm.get('recIngredients')).controls
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route})
  }

}
