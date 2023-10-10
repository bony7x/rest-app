import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFilterFormComponent } from './book-filter-form.component';

describe('BookFilterFormComponent', () => {
  let component: BookFilterFormComponent;
  let fixture: ComponentFixture<BookFilterFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookFilterFormComponent]
    });
    fixture = TestBed.createComponent(BookFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
