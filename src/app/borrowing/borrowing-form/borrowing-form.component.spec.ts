import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowingFormComponent } from './borrowing-form.component';

describe('BorrowingFormComponent', () => {
  let component: BorrowingFormComponent;
  let fixture: ComponentFixture<BorrowingFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorrowingFormComponent]
    });
    fixture = TestBed.createComponent(BorrowingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
