import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  userAccount: string = '';
  constructor() { }

  getUserAccount() {
    return this.userAccount;
  }

  setUserAccount(userAccount: string) {
    this.userAccount = userAccount;
  }

  removeUserAccount() {
    this.userAccount = '';
  }
}
