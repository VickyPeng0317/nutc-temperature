import { Component, OnInit } from '@angular/core';
import { Subject, Observable, timer, interval } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';
import { tap, map, takeUntil } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-upload-temperature-page',
  templateUrl: './upload-temperature-page.component.html',
  styleUrls: ['./upload-temperature-page.component.scss']
})
export class UploadTemperaturePageComponent implements OnInit {
  dialogSetting = {
    isShow: false,
    isSuccess: true,
    msg: '成功'
  };
  webcamImage?: WebcamImage;
  trigger: Subject<void> = new Subject<void>();
  isUploading = false;
  testFlag = true;
  deviceorientationObs$ = new Observable();
  buffer: any[] = [];
  ngOnInit(): void {
    this.listenDeviceorientation();
    this.autoSnapshot();
  }

  autoSnapshot() {
    const tryCount = 20;
    const delay = 1000;
    interval(delay).pipe(
      takeUntil(timer(tryCount * delay)),
    ).subscribe(() => {
      this.triggerSnapshot();
    });
  }

  listenDeviceorientation() {
    this.deviceorientationObs$ = fromEvent(window, 'deviceorientation').pipe(
      map((event: any) => {
        const { alpha, beta, gamma } = event;
        return { alpha, beta, gamma };
      })
    );
  }

  resetSnapshot() {
    delete this.webcamImage;
  }

  triggerSnapshot(): void {
    this.trigger.next();
  }

  handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.buffer.push(webcamImage.imageAsBase64);
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  uploadImg() {
    this.isUploading = true;
    timer(3000).subscribe(() => {
      this.isUploading = false;
      this.testFlag
        ? this.openResDialog(true, '體溫 38.6').subscribe()
        : this.openResDialog(false, '失敗').subscribe();
      this.testFlag = !this.testFlag;
    });
  }

  openResDialog(isSuccess: boolean, msg: string) {
    this.dialogSetting = {
      isShow: true,
      isSuccess,
      msg
    };
    return timer(2000).pipe(
      tap(() => {
        this.dialogSetting.isShow = false
      })
    );
  }
}
