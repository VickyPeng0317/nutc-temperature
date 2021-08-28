import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-info-page',
  templateUrl: './device-info-page.component.html',
  styleUrls: ['./device-info-page.component.scss']
})
export class DeviceInfoPageComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  toUploadPage() {
    this.router.navigate(['upload-tprt'])
  }
}
