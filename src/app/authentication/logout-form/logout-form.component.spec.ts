import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutFormComponent } from './logout-form.component';

describe('LogoutFormComponent', () => {
  let component: LogoutFormComponent;
  let fixture: ComponentFixture<LogoutFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogoutFormComponent]
    });
    fixture = TestBed.createComponent(LogoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
