import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OnsenModule } from 'ngx-onsenui';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DeviceInfoPageComponent } from './feature/page/device-info-page/device-info-page.component';
@NgModule({
  declarations: [
    AppComponent,
    DeviceInfoPageComponent
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
