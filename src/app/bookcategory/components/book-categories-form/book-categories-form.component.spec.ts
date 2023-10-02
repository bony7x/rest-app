import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCategoriesFormComponent } from './book-categories-form.component';

describe('BookCategoriesFormComponent', () => {
  let component: BookCategoriesFormComponent;
  let fixture: ComponentFixture<BookCategoriesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookCategoriesFormComponent]
    });
    fixture = TestBed.createComponent(BookCategoriesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
