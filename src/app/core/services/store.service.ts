import { Injectable } from '@angular/core';
import { IUserListItem } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  constructor() { }

  getUserInfo() {
    const userInfoStr = localStorage.getItem('userInfo') || '{}';
    return JSON.parse(userInfoStr);
  }

  setUserInfo(userInfo: IUserListItem) {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  removeUserInfo() {
    localStorage.setItem('userInfo', JSON.stringify({}));
  }

}
