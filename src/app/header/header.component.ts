import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  collapsed=true

  // headerCol=true

  // @Output() featureSelected=new EventEmitter<string>()

  constructor(private storageSer:DataStorageService) { }

  ngOnInit(): void {
    
  }

  // onSelect(feature:string,color:string){
  //   this.featureSelected.emit(feature)

  //   if(color=='a'){
  //     this.headerCol=true
  //   }
  //   else{
  //     this.headerCol=false
  //   }
    
  // }

  onSaveData(){
    this.storageSer.storeRecipes()
  }

  onFetchData(){
    this.storageSer.fetchRecipes().subscribe()
  }

}
