import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http'

import { StorageViewComponent } from '../Classes/order';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['../w3.css','./storage.component.css'],
  providers: [ StorageService ]
})
export class StorageComponent implements OnInit {
  
  components: StorageViewComponent[]
  errorMessage: string
  checkedComponents: any
  idsToBeDeleted: number[]
  selectedRow: number
  name: string
  sapId: number
  startDate: string
  endDate: string

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.getComponents();

  }

  setClickedRow(index: number){
    this.selectedRow = index
  }

  getComponents() {
    this.storageService.getComponents()
                          .subscribe(
                             components => this.components = components, 
                             error => this.errorMessage = <any>error
                          );
  }

  onSubmit(name: string, lo: number){

  }  

  onChange(){
    
  }

  updateTables(index: number){
    this.storageService.deleteComponents(this.components[index].id)
      .subscribe((ok)=> {
        console.log(ok);
        if (ok.ok) {
         this.components.splice(index, 1)
        } else {
          alert(ok.statusText);
        }
      },
      error => {
        var errorMessage = <Response>error
        if (errorMessage.status == 423) {
          alert("Unable to delete component because it is attached to an order")
        } else {
          alert("Unknown error occoured when trying to delete component")
        }
      }
    );
  }

}
