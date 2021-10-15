import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/core/services/store.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  isLoading = false;
  form = this.formBuilder.group({
    account: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(
    private router: Router,
    private storeService: StoreService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    const { account } = this.form.getRawValue();
    this.storeService.setUserAccount(account);
    this.router.navigate(['/nutc/qrcode']);
  }
}
