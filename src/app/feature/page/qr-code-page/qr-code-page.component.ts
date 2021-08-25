import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr-code-page',
  templateUrl: './qr-code-page.component.html',
  styleUrls: ['./qr-code-page.component.scss']
})
export class QrCodePageComponent implements OnInit {
  qrResultString: string = '';
  constructor() { }

  ngOnInit(): void {
  }
  
  clearResult(): void {
    this.qrResultString = '';
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }
}
