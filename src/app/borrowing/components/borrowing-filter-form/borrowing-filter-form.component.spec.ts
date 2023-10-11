import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowingFilterFormComponent } from './borrowing-filter-form.component';

describe('BorrowingFilterFormComponent', () => {
  let component: BorrowingFilterFormComponent;
  let fixture: ComponentFixture<BorrowingFilterFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorrowingFilterFormComponent]
    });
    fixture = TestBed.createComponent(BorrowingFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
