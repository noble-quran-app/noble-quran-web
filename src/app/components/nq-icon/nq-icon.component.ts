import { Component, Input } from '@angular/core';

@Component({
  selector: 'nq-icon',
  templateUrl: './nq-icon.component.html',
})
export class NqIconComponent {
  constructor() {}
  @Input('icon') iconToRender: string;
}
