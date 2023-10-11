import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCategoriesFilterFormComponent } from './book-categories-filter-form.component';

describe('BookCategoriesFilterFormComponent', () => {
  let component: BookCategoriesFilterFormComponent;
  let fixture: ComponentFixture<BookCategoriesFilterFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookCategoriesFilterFormComponent]
    });
    fixture = TestBed.createComponent(BookCategoriesFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
