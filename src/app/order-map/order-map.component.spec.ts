import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule }                      from '@angular/forms'
import { TagInputModule }           from 'ng2-tag-input'
import { AgmCoreModule }            from '@agm/core';
import { HttpModule }               from '@angular/http'
import { OrderMapComponent } from './order-map.component';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations'

describe('OrderMapComponent', () => {
  let component: OrderMapComponent;
  let fixture: ComponentFixture<OrderMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderMapComponent ],
      imports: [TagInputModule, 
      FormsModule, 
      AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDgZiOHywfy69VV03DxFflWaGS2VBdlS1A'
      }), 
      HttpModule,
      BrowserAnimationsModule
      ],
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
