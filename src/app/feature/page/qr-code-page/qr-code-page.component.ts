import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
@Component({
  selector: 'app-qr-code-page',
  templateUrl: './qr-code-page.component.html',
  styleUrls: ['./qr-code-page.component.scss']
})
export class QrCodePageComponent implements OnInit {

  dialogSetting = {
    isShow: false,
    isSuccess: true,
    msg: '成功'
  };
  constructor() { }

  ngOnInit(): void {
  }


  onCodeResult(resultString: string) {
    const isDevice = resultString.includes('peng');
    if (!isDevice) {
      this.openQRCodeResDialog(false, '無法辨識非設備 QR Code');
      return;
    }
    this.openQRCodeResDialog(true, '掃描成功!');
  }

  openQRCodeResDialog(isSuccess: boolean, msg: string) {
    this.dialogSetting = {
      isShow: true,
      isSuccess,
      msg
    };
    timer(2000).subscribe(() => 
      this.dialogSetting.isShow = false
    );
  }
}
