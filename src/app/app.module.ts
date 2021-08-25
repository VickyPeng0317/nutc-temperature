import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OnsenModule } from 'ngx-onsenui';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DeviceInfoPageComponent } from './feature/page/device-info-page/device-info-page.component';
import { QrCodePageComponent } from './feature/page/qr-code-page/qr-code-page.component';
import { UploadTemperaturePageComponent } from './feature/page/upload-temperature-page/upload-temperature-page.component';
@NgModule({
  declarations: [
    AppComponent,
    DeviceInfoPageComponent,
    QrCodePageComponent,
    UploadTemperaturePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OnsenModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
