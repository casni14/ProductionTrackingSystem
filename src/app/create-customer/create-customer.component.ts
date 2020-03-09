import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http'
import { Customer } from '../Classes/customer';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['../w3.css','./create-customer.component.css'],
  providers: [ CustomerService ]
})
export class CreateCustomerComponent implements OnInit {
  
  customers: Customer[] = []
  errorMessage: string

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getCustomers()
  }

  getCustomers() {
    console.log(this.customers);
    this.customerService.getCustomer()
                          .subscribe(
                             customers => this.customers = customers, 
                             error => this.errorMessage = <any>error
                          )
    console.log(this.customers)
  }

  onSubmit(customerName: string, sapid: number) {
    if(!customerName || !sapid) { return;}
    this.customerService.addCustomer(customerName, sapid)
                          .subscribe(
                            customer => this.customers.push(customer),
                            error => this.errorMessage = <any>error
                          )
  }

  updateCustomers(index: number){
    console.log(this.customers[index].id);
    console.log(this.customers[index].sapId);
    console.log(this.customers[index].name);
    this.customerService.editCustomer(this.customers[index].name, this.customers[index].sapId, this.customers[index].id)
                            .subscribe(
                              customer => this.customers[index] = customer,
                              error => this.errorMessage = <any>error
                            )
  }

  updateTables(index: number){
    this.customerService.deleteCustomer(this.customers[index].id)
      .subscribe((ok)=> {
        console.log(ok);
        if (ok.ok) {
         this.customers.splice(index, 1)
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
