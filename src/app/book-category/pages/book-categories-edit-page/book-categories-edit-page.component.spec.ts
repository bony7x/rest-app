import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCategoriesEditPageComponent } from './book-categories-edit-page.component';

describe('BookCategoriesEditPageComponent', () => {
  let component: BookCategoriesEditPageComponent;
  let fixture: ComponentFixture<BookCategoriesEditPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookCategoriesEditPageComponent]
    });
    fixture = TestBed.createComponent(BookCategoriesEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
