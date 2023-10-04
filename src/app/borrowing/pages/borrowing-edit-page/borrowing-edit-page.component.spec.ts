import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowingEditPageComponent } from './borrowing-edit-page.component';

describe('BorrowingEditPageComponent', () => {
  let component: BorrowingEditPageComponent;
  let fixture: ComponentFixture<BorrowingEditPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorrowingEditPageComponent]
    });
    fixture = TestBed.createComponent(BorrowingEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
