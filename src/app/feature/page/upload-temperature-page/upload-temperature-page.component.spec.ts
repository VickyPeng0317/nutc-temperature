import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTemperaturePageComponent } from './upload-temperature-page.component';

describe('UploadTemperaturePageComponent', () => {
  let component: UploadTemperaturePageComponent;
  let fixture: ComponentFixture<UploadTemperaturePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadTemperaturePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadTemperaturePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
