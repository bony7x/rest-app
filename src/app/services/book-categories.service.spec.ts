import { TestBed } from '@angular/core/testing';

import { BookCategoriesService } from './book-categories.service';

describe('BookCategoriesServiceService', () => {
  let service: BookCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
