import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule }              from '@angular/forms';
import { ViewOrderComponent } from './view-order.component';
import { HttpModule } from '@angular/http'
describe('ViewOrderComponent', () => {
  let component: ViewOrderComponent;
  let fixture: ComponentFixture<ViewOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOrderComponent ],
      imports: [FormsModule, HttpModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
