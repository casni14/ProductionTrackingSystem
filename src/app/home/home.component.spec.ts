import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsModule } from 'ng2-charts'
import { HomeComponent } from './home.component';
import { HttpModule }    from '@angular/http'


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ], 
      imports: [ChartsModule, HttpModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
