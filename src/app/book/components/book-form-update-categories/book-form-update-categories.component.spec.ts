import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFormUpdateCategoriesComponent } from './book-form-update-categories.component';

describe('BookFormAddCategoryComponent', () => {
  let component: BookFormUpdateCategoriesComponent;
  let fixture: ComponentFixture<BookFormUpdateCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookFormUpdateCategoriesComponent]
    });
    fixture = TestBed.createComponent(BookFormUpdateCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
