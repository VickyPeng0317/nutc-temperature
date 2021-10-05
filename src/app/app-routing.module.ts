import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceInfoPageComponent } from './feature/page/device-info-page/device-info-page.component';
import { QrCodePageComponent } from './feature/page/qr-code-page/qr-code-page.component';
import { TemperatureScanPageComponent } from './feature/page/temperature-scan-page/temperature-scan-page.component';
import { UploadTemperaturePageComponent } from './feature/page/upload-temperature-page/upload-temperature-page.component';

const routes: Routes = [
  {
    path: 'device-info',
    component: DeviceInfoPageComponent
  },
  {
    path: 'qrcode',
    component: QrCodePageComponent
  },
  {
    path: 'upload-tprt',
    component: UploadTemperaturePageComponent
  },
  {
    path: 'scan',
    component: TemperatureScanPageComponent
  },
  {
    path: '',
    redirectTo: "qrcode",
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
