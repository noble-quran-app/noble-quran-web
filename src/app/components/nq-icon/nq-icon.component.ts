import { Component, Input } from '@angular/core';

@Component({
  selector: 'nq-icon',
  templateUrl: './nq-icon.component.html',
  styleUrls: ['./nq-icon.component.scss'],
})
export class NqIconComponent {
  constructor() {}
  @Input('icon') iconToRender: string;

  icon(name: string) {
    return name === this.iconToRender;
  }
}
