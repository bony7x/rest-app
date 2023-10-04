import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowingListDashboardComponent } from './borrowing-list-dashboard.component';

describe('BorrowingListDashboardComponent', () => {
  let component: BorrowingListDashboardComponent;
  let fixture: ComponentFixture<BorrowingListDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorrowingListDashboardComponent]
    });
    fixture = TestBed.createComponent(BorrowingListDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
