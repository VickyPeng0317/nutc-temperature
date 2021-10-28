import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePasswordPageComponent } from './update-password-page.component';

describe('UpdatePasswordPageComponent', () => {
  let component: UpdatePasswordPageComponent;
  let fixture: ComponentFixture<UpdatePasswordPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePasswordPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePasswordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
