import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCategoriesDetailComponent } from './book-categories-detail.component';

describe('BookCategoriesDetailComponent', () => {
  let component: BookCategoriesDetailComponent;
  let fixture: ComponentFixture<BookCategoriesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookCategoriesDetailComponent]
    });
    fixture = TestBed.createComponent(BookCategoriesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
