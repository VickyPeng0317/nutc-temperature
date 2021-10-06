import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Observable, timer, interval, of } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';
import { tap, map, takeUntil, finalize } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-temperature-scan-page',
  templateUrl: './temperature-scan-page.component.html',
  styleUrls: ['./temperature-scan-page.component.scss']
})
export class TemperatureScanPageComponent implements OnInit {
  @ViewChild('pageRef', { read: ElementRef }) pageRef: any;
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
  endSubject = new Subject();
  isSuccess = false;
  isShowRefreshBtn = false;
  isScanning = false;
  temperature = 0;
  warnTemperature = 37;
  constructor(
    private http: HttpClient,
    private router: Router,
    private el: ElementRef
  ) { }

  ngOnDestroy(): void {
    this.endSubject.next();
  }
  ngOnInit(): void {
  }

  startScan() {
    const time = 6000;
    const delay = 300;
    this.isScanning = true;
    interval(delay).pipe(
      finalize(() => {
        this.isScanning = false;
        if (this.isSuccess) {
          return;
        }
        this.openResDialog(false, '辨識失敗 請重新辨識').subscribe()
      }),
      takeUntil(timer(time)),
      takeUntil(this.endSubject)
    ).subscribe(() => {
      this.triggerSnapshot();
    });
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
    // of({ temperature: 35.6 }).pipe(
    //   takeUntil(this.endSubject)
    // ).subscribe((res: any) => {
    this.http.post('https://23b7-163-17-132-191.ap.ngrok.io/post_submit', params).pipe(
      takeUntil(this.endSubject)
    ).subscribe((res: any) => {
      if (res === '0') {
        return;
      }
      const { temperature } = res;
      if (+temperature !== 0) {
        this.isSuccess = true;
        this.temperature = +temperature;
        this.endSubject.next();
        this.openResDialog(true, `辨識成功 請按下送出`).pipe(
          tap(() => {
            this.pageToBottom();
          })
        ).subscribe();
      }
    });
  }

  pageToBottom() {
    this.pageRef.nativeElement.scrollTop = 99999;
  }

  pageToTop() {
    this.pageRef.nativeElement.scrollTop = 0;
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
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

  reset() {
    this.isSuccess = false;
    this.temperature = 0;
    timer(100).subscribe(() => this.pageToTop());
  }
}
