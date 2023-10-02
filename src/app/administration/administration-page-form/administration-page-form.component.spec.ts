import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationPageFormComponent } from './administration-page-form.component';

describe('AdministrationPageFormComponent', () => {
  let component: AdministrationPageFormComponent;
  let fixture: ComponentFixture<AdministrationPageFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrationPageFormComponent]
    });
    fixture = TestBed.createComponent(AdministrationPageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
