import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeResDialogComponent } from './qrcode-res-dialog.component';

describe('QrcodeResDialogComponent', () => {
  let component: QrcodeResDialogComponent;
  let fixture: ComponentFixture<QrcodeResDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrcodeResDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrcodeResDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
