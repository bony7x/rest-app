import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFormRemoveCategoryComponent } from './book-form-remove-category.component';

describe('BookFormRemoveCategoryComponent', () => {
  let component: BookFormRemoveCategoryComponent;
  let fixture: ComponentFixture<BookFormRemoveCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookFormRemoveCategoryComponent]
    });
    fixture = TestBed.createComponent(BookFormRemoveCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
