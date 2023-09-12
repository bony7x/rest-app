import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFormAddCategoryComponent } from './book-form-add-category.component';

describe('BookFormAddCategoryComponent', () => {
  let component: BookFormAddCategoryComponent;
  let fixture: ComponentFixture<BookFormAddCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookFormAddCategoryComponent]
    });
    fixture = TestBed.createComponent(BookFormAddCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
