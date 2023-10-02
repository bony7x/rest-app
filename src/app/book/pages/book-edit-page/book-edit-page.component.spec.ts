import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookEditPageComponent } from './book-edit-page.component';

describe('BookEditPageComponent', () => {
  let component: BookEditPageComponent;
  let fixture: ComponentFixture<BookEditPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookEditPageComponent]
    });
    fixture = TestBed.createComponent(BookEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
