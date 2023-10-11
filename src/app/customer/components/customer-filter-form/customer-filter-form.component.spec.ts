import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFilterFormComponent } from './customer-filter-form.component';

describe('CustomerFilterFormComponent', () => {
  let component: CustomerFilterFormComponent;
  let fixture: ComponentFixture<CustomerFilterFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerFilterFormComponent]
    });
    fixture = TestBed.createComponent(CustomerFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
