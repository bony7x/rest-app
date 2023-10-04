import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCategoriesPageComponent } from './book-categories-page.component';

describe('BookcategoriesComponent', () => {
  let component: BookCategoriesPageComponent;
  let fixture: ComponentFixture<BookCategoriesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookCategoriesPageComponent]
    });
    fixture = TestBed.createComponent(BookCategoriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
