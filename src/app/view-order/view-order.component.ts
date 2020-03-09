import { Component, OnInit, EventEmitter }  from '@angular/core'

import { ViewOrderService }   from './view-order.service'
import { Order }              from '../Classes/order' 

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['../w3.css', './view-order.component.css'],
  providers: [ ViewOrderService ]
})
export class ViewOrderComponent implements OnInit {

orders: Order[] = []
startDate: string
endDate: string
errorMessage: string
inputValue: Date
inputValueChange: EventEmitter<any> = new EventEmitter();

constructor(private orderService: ViewOrderService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrder(this.startDate, this.endDate)
                    .subscribe(
                      orders => this.orders = orders,
                      error => this.errorMessage = <any>error
                    )
      console.log(this.orders[0])
  }

  onChange(){
    console.log("changed")
    this.getOrders();
  }

  updateTables(index: number){
    this.orderService.deleteOrder(this.orders[index].id)
      .subscribe((ok)=> {
        console.log(ok);
        if (ok.ok) {
         this.orders.splice(index, 1)
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
