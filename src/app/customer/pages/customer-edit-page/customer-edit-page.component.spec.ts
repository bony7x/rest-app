import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEditPageComponent } from './customer-edit-page.component';

describe('CustomerEditPageComponent', () => {
  let component: CustomerEditPageComponent;
  let fixture: ComponentFixture<CustomerEditPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerEditPageComponent]
    });
    fixture = TestBed.createComponent(CustomerEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
