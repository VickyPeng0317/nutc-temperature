import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceInfoPageComponent } from './feature/page/device-info-page/device-info-page.component';

const routes: Routes = [
  {
    path: 'device-info',
    component: DeviceInfoPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
