import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCategoriesDetailPageComponent } from './book-categories-detail-page.component';

describe('BookCategoriesDetailComponent', () => {
  let component: BookCategoriesDetailPageComponent;
  let fixture: ComponentFixture<BookCategoriesDetailPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookCategoriesDetailPageComponent]
    });
    fixture = TestBed.createComponent(BookCategoriesDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
