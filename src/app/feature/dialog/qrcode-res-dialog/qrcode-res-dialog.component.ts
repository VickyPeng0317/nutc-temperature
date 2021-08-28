import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-qrcode-res-dialog',
  templateUrl: './qrcode-res-dialog.component.html',
  styleUrls: ['./qrcode-res-dialog.component.scss']
})
export class QrcodeResDialogComponent implements OnInit {
  @Input() isSuccess = true;
  @Input() msg = '';
  @Input() title = '';
  constructor() { }

  ngOnInit(): void {
  }

}
