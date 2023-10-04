import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCategoriesSearchComponent } from './book-categories-search.component';

describe('BookCategoriesSearchComponent', () => {
  let component: BookCategoriesSearchComponent;
  let fixture: ComponentFixture<BookCategoriesSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookCategoriesSearchComponent]
    });
    fixture = TestBed.createComponent(BookCategoriesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
