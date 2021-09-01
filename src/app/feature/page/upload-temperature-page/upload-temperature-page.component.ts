import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Observable, timer, interval } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';
import { tap, map, takeUntil, finalize } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-upload-temperature-page',
  templateUrl: './upload-temperature-page.component.html',
  styleUrls: ['./upload-temperature-page.component.scss']
})
export class UploadTemperaturePageComponent implements OnInit, OnDestroy {
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
  resList: any[] = [];
  endSubject = new Subject();
  isSuccess = false;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.endSubject.next();
  }
  ngOnInit(): void {
    this.listenDeviceorientation();
    this.autoSnapshot();
  }

  autoSnapshot() {
    const time = 6000;
    const delay = 300;
    interval(delay).pipe(
      finalize(() => {
        if (this.isSuccess) {
          return;
        }
        this.openResDialog(false, '辨識失敗').pipe(
          tap(() => this.router.navigate(['device-info']))
        ).subscribe()
      }),
      takeUntil(timer(time))
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
    const params = {
      username: webcamImage.imageAsBase64
    };
    this.http.post('https://23b7-163-17-132-191.ap.ngrok.io/post_submit', params).pipe(
      takeUntil(this.endSubject)
    ).subscribe((res: any) => {
      if (res === '0') {
        return;
      }
      const { temperature } = res;
      if (+temperature !== 0) {
        this.isSuccess = true;
        this.openResDialog(true, `體溫 ${temperature}`).pipe(
          tap(() => {
            this.endSubject.next();
            this.router.navigate(['device-info']);
          })
        ).subscribe();
      }
    });
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
