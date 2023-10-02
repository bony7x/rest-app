import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowingSearchComponent } from './borrowing-search.component';

describe('BorrowingSearchComponent', () => {
  let component: BorrowingSearchComponent;
  let fixture: ComponentFixture<BorrowingSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorrowingSearchComponent]
    });
    fixture = TestBed.createComponent(BorrowingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
