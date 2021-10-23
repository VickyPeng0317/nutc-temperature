import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/core/services/store.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  isLoading = false;
  form = this.formBuilder.group({
    userAccount: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(
    private router: Router,
    private storeService: StoreService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    const params = this.form.getRawValue();
    this.userService.login(params).subscribe(res => {
      const { isSuccess, data } = res;
      if (!isSuccess) {
        alert('帳號或密碼錯誤');
        return;
      }
      this.storeService.setUserInfo(data);
      this.router.navigate(['/nutc/qrcode']);
    });
  }
}
