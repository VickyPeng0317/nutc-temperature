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
import { HttpClientModule } from '@angular/common/http';
import { TemperatureScanPageComponent } from './feature/page/temperature-scan-page/temperature-scan-page.component';
import { LoginPageComponent } from './feature/page/login-page/login-page.component';
import { LayoutTemplateComponent } from './feature/page/layout-template/layout-template.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './core/guard/auth-guard';
import { QRCodeModule } from 'angularx-qrcode';
import { UpdatePasswordPageComponent } from './feature/page/update-password-page/update-password-page.component';

@NgModule({
  declarations: [
    AppComponent,
    DeviceInfoPageComponent,
    QrCodePageComponent,
    UploadTemperaturePageComponent,
    QrcodeResDialogComponent,
    TemperatureScanPageComponent,
    LoginPageComponent,
    LayoutTemplateComponent,
    UpdatePasswordPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OnsenModule,
    FlexLayoutModule,
    ZXingScannerModule,
    WebcamModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    QRCodeModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
