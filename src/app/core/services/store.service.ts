import { Injectable } from '@angular/core';
import { IDeviceInfo } from './device.service';
import { IUserListItem } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  constructor() { }

  getUserInfo() {
    const userInfoStr = this.getStorage('userInfo') || '{}';
    return JSON.parse(userInfoStr);
  }

  setUserInfo(userInfo: IUserListItem) {
    this.setStorage('userInfo', JSON.stringify(userInfo));
  }

  removeUserInfo() {
    this.setStorage('userInfo', JSON.stringify({}));
  }

  getDeviceInfo() {
    const userInfoStr = this.getStorage('deviceInfo') || '{}';
    return JSON.parse(userInfoStr);
  }

  setDeviceInfo(deviceInfo: IDeviceInfo) {
    this.setStorage('deviceInfo', JSON.stringify(deviceInfo));
  }

  removeDeviceInfo() {
    this.setStorage('deviceInfo', JSON.stringify({}));
  }

  getValidTime() {
    return this.getStorage('validTime');
    // return '2021/10/23 13:00:00';
  }

  setValidTime(timeStr: string) {
    this.setStorage('validTime', timeStr);
  }

  removeValidTime() {
    this.setStorage('validTime', '');
  }

  getTemperature() {
    return this.getStorage('temperature');
  }

  setTemperature(timeStr: string) {
    this.setStorage('temperature', timeStr);
  }

  removeTemperature() {
    this.setStorage('temperature', '');
  }

  getStorage(key: string) {
    return localStorage.getItem(key);
  }

  setStorage(key: string, data: string) {
    localStorage.setItem(key, data);
  }

}
