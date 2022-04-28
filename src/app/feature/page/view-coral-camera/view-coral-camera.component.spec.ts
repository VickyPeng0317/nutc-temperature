import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCoralCameraComponent } from './view-coral-camera.component';

describe('ViewCoralCameraComponent', () => {
  let component: ViewCoralCameraComponent;
  let fixture: ComponentFixture<ViewCoralCameraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCoralCameraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCoralCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
