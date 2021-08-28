import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OnsenModule } from 'ngx-onsenui';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DeviceInfoPageComponent } from './feature/page/device-info-page/device-info-page.component';
import { QrCodePageComponent } from './feature/page/qr-code-page/qr-code-page.component';
import { UploadTemperaturePageComponent } from './feature/page/upload-temperature-page/upload-temperature-page.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QrcodeResDialogComponent } from './feature/dialog/qrcode-res-dialog/qrcode-res-dialog.component';
import { WebcamModule } from 'ngx-webcam';
@NgModule({
  declarations: [
    AppComponent,
    DeviceInfoPageComponent,
    QrCodePageComponent,
    UploadTemperaturePageComponent,
    QrcodeResDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OnsenModule,
    FlexLayoutModule,
    ZXingScannerModule,
    WebcamModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
