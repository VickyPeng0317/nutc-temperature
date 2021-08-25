import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  footerMenu = [
    {
      title: '掃描裝置',
      icon: 'qr-code-outline',
      path: '/qrcode',
      checked: ''
    },
    {
      title: '首頁',
      icon: 'home',
      path: '/device-info',
      checked: ''
    },
    {
      title: '體溫上傳',
      icon: 'thermometer-outline',
      path: '/upload-tprt',
      checked: ''
    }
  ];
  constructor(
    private router: Router
  ) {}
  ngOnInit() {
    this.setMenuChecked();
  }
  setMenuChecked() {
    timer(500).subscribe(() => 
      this.footerMenu.forEach(item => {
        if (item.path === this.router.url) {
          item.checked = 'ckecked';
        }
      })
    );
  }
  toPage(path: string){
    this.router.navigate([path]);
  }
}
