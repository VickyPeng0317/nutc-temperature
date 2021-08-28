import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
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
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  onCodeResult(resultString: string) {
    const isDevice = resultString.includes('peng');
    if (!isDevice) {
      this.openQRCodeResDialog(false, '非設備 QRCode').subscribe();
      return;
    }
    this.openQRCodeResDialog(true, '掃描成功!').subscribe(() => {
      this.router.navigate(['device-info']);
    });
  }

  openQRCodeResDialog(isSuccess: boolean, msg: string) {
    this.dialogSetting = {
      isShow: true,
      isSuccess,
      msg
    };
    return timer(2000).pipe(
      tap(() => this.dialogSetting.isShow = false)
    );
  }
}
