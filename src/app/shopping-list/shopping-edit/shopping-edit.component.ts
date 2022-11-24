import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingedient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  //after form handling
  // @ViewChild('nameInput') nameRef:ElementRef
  // @ViewChild('amountInput') amountRef:ElementRef

  @ViewChild('f',{static:false}) slForm:NgForm

  // @Output() ingredientAdded=new EventEmitter<Ingredient>()
  subscription:Subscription
  editMode=false
  editedItemIndex:number
  editedItem:Ingredient

  constructor(private slSer:ShoppingListService) { }

  ngOnInit(): void {
    this.subscription=this.slSer.startedEditing.subscribe((index:number)=>
    {
      this.editMode=true
      this.editedItemIndex=index
      this.editedItem=this.slSer.getIngredient(index)
      this.slForm.form.setValue({
        name:this.editedItem.name,
        amount:this.editedItem.amount
      })
    })
  }

  onAddItem(f:NgForm){
      //after form handling
    // const name=this.nameRef.nativeElement.value
    // const amount=this.amountRef.nativeElement.value
    const name=f.value.name
    const amount=f.value.amount
    // if(name.trim()===""){
    //   alert("please add name of the ingredient")
    //   return
    // }
    // if(amount<1){
    //   alert("amount should be 1 or more than 1")
    //   return
    // }

    const newIngredient=new Ingredient(name,amount)
    // this.ingredientAdded.emit(newIngredient)
    if(this.editMode){
      this.slSer.updateIngredient(this.editedItemIndex,newIngredient)
    }
    else{
    this.slSer.addIngredient(newIngredient)
    }
    this.resetForm()

  }

  onDeleteItem(){
    this.slSer.deleteIngredient(this.editedItemIndex)
    this.resetForm()
  }

  resetForm(){
    this.slForm.reset()
    this.editMode=false

  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }

}
