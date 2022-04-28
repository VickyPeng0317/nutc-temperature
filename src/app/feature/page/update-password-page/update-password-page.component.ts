import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/core/services/store.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-update-password-page',
  templateUrl: './update-password-page.component.html',
  styleUrls: ['./update-password-page.component.scss']
})
export class UpdatePasswordPageComponent implements OnInit {
  formGroup = new FormGroup({
    oldPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    checkNewPassword: new FormControl('', Validators.required)
  });
  constructor(
    private storeService: StoreService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  updatePassword() {
    const { oldPassword, newPassword, checkNewPassword} = this.formGroup.getRawValue();
    if (newPassword !== checkNewPassword) {
      return alert('新密碼不一致，請重新輸入');
    }
    const { userId } = this.storeService.getUserInfo();
    const params = { userId, oldPassword, newPassword };
    this.userService.updatePassword(params).subscribe(res => {
      const { isSuccess } = res;
      if (!isSuccess) {
        return alert('修改密碼失敗');
      }
      this.router.navigate(['/nutc/qrcode'])
    });
  }

}
