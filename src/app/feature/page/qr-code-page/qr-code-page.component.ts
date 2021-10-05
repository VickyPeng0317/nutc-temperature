import { AfterContentInit, AfterViewInit, Component, ContentChild, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
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
  constructor(
    private router: Router
  ) { }
  ngAfterViewInit(): void {
    timer(100).subscribe(() => {
      const canvas = <HTMLCanvasElement> document.getElementById('stage');
      const ctx = <CanvasRenderingContext2D> canvas?.getContext('2d');
      const recWidth = 100;
      const recHeight = 100;
      const xPos = canvas?.width/2 - (recWidth/2);
      const yPos = canvas?.height/2 - (recHeight/2);
      ctx.globalAlpha= 0.5;
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas?.width, canvas?.height);
      ctx.clearRect(xPos, yPos, recWidth, recHeight);
    });
  }


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
