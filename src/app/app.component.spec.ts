import { TestBed, async } from '@angular/core/testing';
import { AppRoutingModule }         from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent }            from './home/home.component';
import { CreateCustomerComponent }  from './create-customer/create-customer.component';
import { ViewOrderComponent }       from './view-order/view-order.component';
import { StorageComponent }         from './storage/storage.component';
import { OrderMapComponent }        from './order-map/order-map.component';
import { FormsModule }              from '@angular/forms';
import { APP_BASE_HREF }            from '@angular/common'

import { AgmCoreModule }            from '@agm/core';
import { ChartsModule }             from 'ng2-charts';
import { TagInputModule }           from 'ng2-tag-input'


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HomeComponent,
        CreateCustomerComponent,
        ViewOrderComponent,
        StorageComponent,
        OrderMapComponent
      ], 
      imports: [
        AppRoutingModule,
        ChartsModule,
        FormsModule,
        AgmCoreModule.forRoot({
        apiKey: 'AIzaSyDgZiOHywfy69VV03DxFflWaGS2VBdlS1A'
        }),
        TagInputModule
      ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }]
    }).compileComponents();
  }));

  it('true is true', () => expect(true).toBe(true))

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));

  /*it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));*/
});
