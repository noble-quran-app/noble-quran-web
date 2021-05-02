import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'nq-read-toolbar',
  templateUrl: './read-toolbar.component.html',
  styleUrls: ['./read-toolbar.component.scss'],
})
export class ReadToolbarComponent implements OnInit {
  constructor(public settings: SettingService) {}

  ngOnInit(): void {}
}
