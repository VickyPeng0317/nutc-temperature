import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Observable, timer, interval, of } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';
import { tap, map, takeUntil, finalize, take } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ScanService } from 'src/app/core/services/scan.service';
import { StoreService } from 'src/app/core/services/store.service';
import { RecordService } from 'src/app/core/services/record.service';
import * as moment from 'moment';
@Component({
  selector: 'app-temperature-scan-page',
  templateUrl: './temperature-scan-page.component.html',
  styleUrls: ['./temperature-scan-page.component.scss']
})
export class TemperatureScanPageComponent implements OnInit, AfterViewInit {
  @ViewChild('pageRef', { read: ElementRef }) pageRef: any;
  dialogSetting = {
    isShow: false,
    isSuccess: true,
    msg: '成功'
  };
  trigger: Subject<void> = new Subject<void>();
  isUploading = false;
  isFinishUpload = false;
  isSuccess = false;

  warnTemperature = environment.HOT;
  get uploadTime() {
    const validTimeStr = this.storeService.getValidTime();
    return moment(validTimeStr).add(-4, 'hour').format('YYYY/MM/DD HH:mm:ss');
  }
  get deviceInfo() {
    return this.storeService.getDeviceInfo();
  }
  get temperature() {
    return +(this.storeService.getTemperature() || 0);
  }

  endSubject = new Subject();
  qrCodeData = 'null';
  constructor(
    private router: Router,
    private el: ElementRef,
    private scanService: ScanService,
    private storeService: StoreService,
    private recordService: RecordService
  ) { }
  ngAfterViewInit(): void {
    timer(2000).subscribe(() => {
      this.drawMask();
    });
  }
  drawMask() {
    const canvas = <HTMLCanvasElement> document.getElementById('stage');
    const ctx = <CanvasRenderingContext2D> canvas?.getContext('2d');
    const recWidth = canvas?.width;
    const recHeight = 150;
    const xPos = canvas?.width/2 - (recWidth/2);
    const yPos = canvas?.height/2 - (recHeight/2);
    ctx.globalAlpha= 0.6;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas?.width, canvas?.height-5);
    ctx.clearRect(xPos, yPos, recWidth, recHeight);
  }
  get canvasWidth() {
    return (document.getElementsByClassName('canvas')[0] as any).offsetWidth
  }
  get canvasHeidht() {
    return (document.getElementsByClassName('canvas')[0] as any).offsetHeight
  }

  ngOnDestroy(): void {
    this.endSubject.next();
  }

  ngOnInit(): void {
    const hasValid = this.checkHasValidTimeAndTemperature();
    if (!hasValid) {
      timer(5000).subscribe(() => this.startScan());
      return;
    }
    this.isFinishUpload = true;
    this.isSuccess = true;
    this.timeObs = this.getTimerObs$(this.storeService.getValidTime() || '');
    this.qrCodeData = this.getQrCodeData();
  }

  checkHasValidTimeAndTemperature() {
    const validTimeStr = this.storeService.getValidTime();
    if (!validTimeStr) {
      return false;
    }
    const validTime = moment(validTimeStr);
    const nowTime = moment();
    const second = +validTime.diff(nowTime, 'second');
    if (second < 60) {
      return false;
    }
    if (!this.temperature) {
      return false;
    }
    return true;
  }

  getQrCodeData() {
    const { userId } = this.storeService.getUserInfo();
    const { deviceId } = this.deviceInfo.deviceId;
    const temperature = this.temperature;
    const validTime = this.storeService.getValidTime();
    return JSON.stringify({ userId, deviceId, temperature, validTime });
  }

  getTimerObs$(validTimeStr: string) {
    const validTime = moment(validTimeStr);
    const nowTime = moment();
    const second = +validTime.diff(nowTime, 'second');
    return interval(1000).pipe(
      take(second * 1000),
      map(x => {
        const s = (second - x);
        const statusLogic = [
          {
            logic: s < 1 * 60 * 60,
            status: 'danger-theme'
          },
          {
            logic: s < 2 * 60 * 60,
            status: 'warn-theme'
          },
          {
            logic: true,
            status: 'success-theme'
          }
        ];
        const status = statusLogic.find(x => x.logic)?.status;
        const value = moment.utc(s*1000).format('HH:mm:ss');
        return { status, value };
      }), 
      tap(x => {
        if (x.value === '00:00:30') {
          alert('請重新掃描設備');
          this.router.navigate(['/nutc/qrcode']);
        }
      }),
      takeUntil(this.endSubject)
    );
  }

  startScan() {
    const time = 10000;
    const delay = 500;
    interval(delay).pipe(
      finalize(() => {
        if (this.isSuccess) {
          return;
        }
        this.openResDialog(false, '辨識失敗 請對準設備').subscribe(() => {
          this.startScan();
        });
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
    const params = {
      username: webcamImage.imageAsBase64
    };
    this.scanService.uploadTemperature(params).pipe(
      takeUntil(this.endSubject)
    ).subscribe((res: any) => {
      if (res === '0') {
        return;
      }
      const { temperature } = res;
      if (+temperature !== 0) {
        this.isSuccess = true;
        this.storeService.setTemperature(temperature)
        this.endSubject.next();
        this.openResDialog(true, `辨識成功 !`).pipe(
          tap(() => {
            this.pageToBottom();
            this.send();
          })
        ).subscribe();
      }
    });
  }
  timeObs: any = of({});
  send() {
    this.isUploading = true;
    const { userId } = this.storeService.getUserInfo();
    const { deviceId } = this.storeService.getDeviceInfo();
    const temperature = this.temperature.toString();
    const createdTime = moment().format('YYYY/MM/DD HH:mm:ss');
    const params = { userId, deviceId, temperature, createdTime };
    this.recordService.createRecord(params).subscribe(res => {
      this.isUploading = false;
      const { isSuccess } = res;
      if (!isSuccess) {
        alert('上傳失敗');
        return;
      }
      this.isFinishUpload = true;
      const validTimeStr = moment().add(4, 'hours').format('YYYY/MM/DD HH:mm:ss');
      this.storeService.setValidTime(validTimeStr);
      this.timeObs = this.getTimerObs$(validTimeStr);
      this.qrCodeData = this.getQrCodeData();
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
        this.dialogSetting.isShow = false;
      })
    );
  }

  // reset() {
  //   this.isSuccess = false;
  //   this.temperature = 0;
  //   timer(100).subscribe(() => {
  //     this.pageToTop();
  //     this.drawMask();
  //     timer(2000).subscribe(() => this.startScan());
  //   });
  // }
}
