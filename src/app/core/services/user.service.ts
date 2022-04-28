import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiAction, Post } from '../decorators/api-decorator';
import { LoginMock } from '../mocks/user-mock';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  @Post({
    path: '/user/login',
    mockData: LoginMock
  })
  login!: ApiAction<ILoginReq, ILoginRes>;

  @Post({
    path: '/user/updatePassword',
    mockData: { isSuccess: true }
  })
  updatePassword!: ApiAction<IUpdatePasswordReq, { isSuccess: boolean }>;
}

interface IUpdatePasswordReq {
  userId: number;
  oldPassword: string;
  newPassword: string;
}


interface ILoginReq {
  userAccount: string;
  password: string;
}

interface ILoginRes {
  isSuccess: boolean;
  data: IUserListItem;
}

export interface IUserListItem {
  userId: number;
  userAccount: string;
  userName: string;
  collegeName: number;
  departmentName: string;
  departmentSubName: string;
  identity: string;
}