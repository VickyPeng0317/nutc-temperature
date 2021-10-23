import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/core/services/store.service';

@Component({
  selector: 'app-layout-template',
  templateUrl: './layout-template.component.html',
  styleUrls: ['./layout-template.component.scss']
})
export class LayoutTemplateComponent implements OnInit {

  constructor(
    private router: Router,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
  }
  toPage(path: string){
    this.router.navigate([path]);
  }
  logout() {
    this.storeService.removeUserInfo();
    this.router.navigate(['/login']);
  }
}
