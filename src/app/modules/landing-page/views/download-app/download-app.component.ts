import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-download-app',
  templateUrl: './download-app.component.html',
  styleUrls: ['./download-app.component.scss'],
})
export class DownloadAppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  downloadApp() {
    const link = document.createElement('a');
    link.setAttribute(
      'href',
      'https://store8.gofile.io/download/ca2197ee-05b5-44cf-a3d8-b19576a9fbe6/Enhance-App.apk'
    );
    link.setAttribute('download', `enhance`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
