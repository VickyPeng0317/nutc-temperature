import { Component, OnInit } from '@angular/core';
import { Subject, Observable, timer } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';
import { tap, map } from 'rxjs/operators';
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
  ngOnInit(): void {
    this.listenDeviceorientation();
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
