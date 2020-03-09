import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule }              from '@angular/forms';
import { CreateCustomerComponent } from './create-customer.component';
import { HttpModule } from '@angular/http'
import { Customer } from '../Classes/customer'

describe('CreateCustomerComponent', () => {
  let component: CreateCustomerComponent;
  let fixture: ComponentFixture<CreateCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCustomerComponent ],
      imports: [FormsModule, HttpModule]
    })
    .compileComponents();
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCustomerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

      var dexpectedCustomer = new Customer(30, "hans", 9999);
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display customer, when name and sapId is entered and submit is clicked', () =>{
   
  })
});
