import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-view-coral-camera',
  templateUrl: './view-coral-camera.component.html',
  styleUrls: ['./view-coral-camera.component.scss']
})
export class ViewCoralCameraComponent implements OnInit {
  imageSrc: any;
  constructor(
    private http: HttpClient,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.http.get('http://192.168.43.157:5000/camera').subscribe((res: any) => {
      console.log(res.prefix + res.data);
      this.imageSrc = this.domSanitizer.bypassSecurityTrustUrl(res.prefix + res.data);
    });
  }

}
