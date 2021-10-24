import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiAction, Post } from '../decorators/api-decorator';
import { GetDeviceInfoMock } from '../mocks/device-mock';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(
    private http: HttpClient
  ) { }

  /** 取得裝置詳細 */
  @Post({
    path: '/device/info',
    mockData: GetDeviceInfoMock
  })
  getDeviceInfo!: ApiAction<{ deviceId: number }, IDeviceInfo>;
}

export interface IDeviceInfo {
  deviceId?: number;
  deviceName: string;
  deviceCode: string;
  place: string;
  maintainOrganization: string;
  maintainCall: string;
  status: string;
  type: string;
}