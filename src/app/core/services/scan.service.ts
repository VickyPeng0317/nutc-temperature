import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, timer } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScanService {

  constructor(
    private http: HttpClient
  ) { }
  uploadTemperature(params: IUploadTemperatureReq) {
    const obs$ = environment.isMock
      ? of({ temperature: 36.6 }).pipe(delay(300))
      :this.http.post(environment.scanApiPath, params)
    return obs$;
  }
}

interface IUploadTemperatureReq {
  username: string;
}