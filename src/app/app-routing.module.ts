import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CreateCustomerComponent } from './create-customer/create-customer.component'
import { HomeComponent } from './home/home.component'
import { StorageComponent } from './storage/storage.component'
import { ViewOrderComponent } from './view-order/view-order.component'
import { OrderMapComponent } from './order-map/order-map.component'

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent },
    { path: 'createCustomer', component: CreateCustomerComponent },
    { path: 'viewOrder', component: ViewOrderComponent},
    { path: 'storage', component: StorageComponent},
    { path: 'orderMap', component: OrderMapComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}