import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFilterFormComponent } from './user-filter-form.component';

describe('UserFilterFormComponent', () => {
  let component: UserFilterFormComponent;
  let fixture: ComponentFixture<UserFilterFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserFilterFormComponent]
    });
    fixture = TestBed.createComponent(UserFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
