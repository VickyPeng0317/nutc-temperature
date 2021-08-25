import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceInfoPageComponent } from './feature/page/device-info-page/device-info-page.component';
import { QrCodePageComponent } from './feature/page/qr-code-page/qr-code-page.component';
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
