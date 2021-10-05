import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureScanPageComponent } from './temperature-scan-page.component';

describe('TemperatureScanPageComponent', () => {
  let component: TemperatureScanPageComponent;
  let fixture: ComponentFixture<TemperatureScanPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemperatureScanPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureScanPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
