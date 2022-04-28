import { AfterContentInit, AfterViewInit, Component, ContentChild, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { StoreService } from 'src/app/core/services/store.service';
import { DeviceService, IDeviceInfo } from 'src/app/core/services/device.service';
@Component({
  selector: 'app-qr-code-page',
  templateUrl: './qr-code-page.component.html',
  styleUrls: ['./qr-code-page.component.scss']
})
export class QrCodePageComponent implements OnInit, AfterViewInit {

  dialogSetting = {
    isShow: false,
    isSuccess: true,
    msg: '成功'
  };
  get canvasWidth() {
    return document.getElementsByTagName('video')[0].offsetWidth
  }
  get canvasHeidht() {
    return document.getElementsByTagName('video')[0].offsetHeight
  }
  constructor(
    private router: Router,
    private storeService: StoreService,
    private deviceService: DeviceService
  ) { }
  ngAfterViewInit(): void {
    timer(2000).subscribe(() => {
      const canvas = <HTMLCanvasElement> document.getElementById('stage');
      const ctx = <CanvasRenderingContext2D> canvas?.getContext('2d');
      const recWidth = 200;
      const recHeight = 200;
      const xPos = canvas?.width/2 - (recWidth/2);
      const yPos = canvas?.height/2 - (recHeight/2);
      ctx.globalAlpha= 0.5;
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas?.width, canvas?.height);
      ctx.clearRect(xPos, yPos, recWidth, recHeight);
    });
  }


  ngOnInit(): void {
    this.storeService.removeValidTime();
    this.storeService.removeTemperature();
  }


  onCodeResult(resultString: string) {
    try {
      const deviceInfo = JSON.parse(resultString) as IDeviceInfo;
      const { deviceId } = deviceInfo;
      // QRCode 沒 device id 離開
      if (!deviceId) {
        this.openQRCodeResDialog(false, '非設備 QRCode').subscribe();
        return;
      }
      // 依 ID 取詳細
      this.deviceService.getDeviceInfo({ deviceId }).subscribe(res => {
        // 找不到就離開
        if (!res.deviceId) {
          this.openQRCodeResDialog(false, '非設備 QRCode').subscribe();
          return;
        }
        // 儲存裝置資訊並跳頁
        this.storeService.setDeviceInfo(res);
        this.openQRCodeResDialog(true, '掃描成功!').subscribe(() => {
          this.router.navigate(['/nutc/scan']);
        });
      });
    } catch(e) {
      this.openQRCodeResDialog(false, '非設備 QRCode').subscribe();
    }
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
