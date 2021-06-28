import { Component, Input, OnInit } from '@angular/core';
import { Community } from 'src/app/models/entities/community.interface';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
