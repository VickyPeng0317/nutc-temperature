import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { timer } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  footerMenu = [
    {
      title: '掃描設備',
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
  currentPath = '';
  constructor(
    private router: Router
  ) {}
  ngOnInit() {
    this.listenUrlChange();
  }
  listenUrlChange() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event: any) => {
      this.currentPath = event.url;
    });
  }
  toPage(path: string){
    this.router.navigate([path]);
  }
}
