import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiAction, Post } from '../decorators/api-decorator';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(
    private http: HttpClient
  ) { }

  /** 新增辨識紀錄 */
  @Post({
    path: '/record/create',
    mockData: { isSuccess: true }
  })
  createRecord?: ApiAction<ICreateRecordReq, { isSuccess: boolean }>;
}

export interface ICreateRecordReq {
  userId: number;
  deviceId: number;
  temperature: string;
  createdTime: string;
}
