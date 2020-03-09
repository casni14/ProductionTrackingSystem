import { BrowserModule }            from '@angular/platform-browser';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations'
import { NgModule }                 from '@angular/core';
import { FormsModule }              from '@angular/forms';
import { HttpModule }               from '@angular/http';
import { AppComponent }             from './app.component';
import { AppRoutingModule }         from './app-routing.module';
import { trigger, state, style, 
         transition, animate }      from '@angular/animations'
import { provideRoutes } from '@angular/router';

// API's
import { AgmCoreModule }            from '@agm/core';
import { ChartsModule }             from 'ng2-charts';
import { TagInputModule }           from 'ng2-tag-input'

// Components
import { HomeComponent }            from './home/home.component';
import { CreateCustomerComponent }  from './create-customer/create-customer.component';
import { ViewOrderComponent }       from './view-order/view-order.component';
import { StorageComponent }         from './storage/storage.component';
import { OrderMapComponent }        from './order-map/order-map.component';

//Services
import { CustomerService }          from './create-customer/customer.service'
import { StorageService }           from './storage/storage.service'
import { ViewOrderService }         from './view-order/view-order.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StorageComponent,
    CreateCustomerComponent,
    ViewOrderComponent,
    OrderMapComponent
  ],
  imports: [
    ChartsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDgZiOHywfy69VV03DxFflWaGS2VBdlS1A'
    }),
    TagInputModule
  ],
  providers: [CustomerService, ViewOrderService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }