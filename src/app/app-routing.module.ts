import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guard/auth-guard';
import { DeviceInfoPageComponent } from './feature/page/device-info-page/device-info-page.component';
import { LayoutTemplateComponent } from './feature/page/layout-template/layout-template.component';
import { LoginPageComponent } from './feature/page/login-page/login-page.component';
import { QrCodePageComponent } from './feature/page/qr-code-page/qr-code-page.component';
import { TemperatureScanPageComponent } from './feature/page/temperature-scan-page/temperature-scan-page.component';
import { UploadTemperaturePageComponent } from './feature/page/upload-temperature-page/upload-temperature-page.component';

const routes: Routes = [
  {
    path: 'nutc',
    component: LayoutTemplateComponent,
    canActivate: [AuthGuard],
    children: [
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
    ]
  },
  {
    path: 'login',
    component: LoginPageComponent
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
