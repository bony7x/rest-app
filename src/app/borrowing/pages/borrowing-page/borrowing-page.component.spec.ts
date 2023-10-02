import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowingPageComponent } from './borrowing-page.component';

describe('BorrowingComponent', () => {
  let component: BorrowingPageComponent;
  let fixture: ComponentFixture<BorrowingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorrowingPageComponent]
    });
    fixture = TestBed.createComponent(BorrowingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
