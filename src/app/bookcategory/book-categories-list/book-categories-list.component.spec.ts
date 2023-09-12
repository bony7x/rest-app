import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCategoriesListComponent } from './book-categories-list.component';

describe('BookCategoriesListComponent', () => {
  let component: BookCategoriesListComponent;
  let fixture: ComponentFixture<BookCategoriesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookCategoriesListComponent]
    });
    fixture = TestBed.createComponent(BookCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
