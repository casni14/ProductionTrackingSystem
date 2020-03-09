import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule }              from '@angular/forms';
import { HttpModule }               from '@angular/http';
import { StorageComponent } from './storage.component';

describe('StorageComponent', () => {
  let component: StorageComponent;
  let fixture: ComponentFixture<StorageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageComponent ],
      imports: [FormsModule, HttpModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
