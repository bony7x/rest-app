import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pageable } from './pageable.component';

describe('PaginationComponent', () => {
  let component: Pageable;
  let fixture: ComponentFixture<Pageable>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Pageable]
    });
    fixture = TestBed.createComponent(Pageable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
