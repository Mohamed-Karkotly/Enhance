import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss'],
})
export class SocialMediaComponent implements OnInit {
  @Input() facebook?: string;
  @Input() instagram?: string;
  @Input() linkedin?: string;
  @Input() twitter?: string;
  @Input() youtube?: string;

  constructor() {}

  ngOnInit(): void {}
}
