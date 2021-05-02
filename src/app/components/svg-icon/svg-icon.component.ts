import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg-icon',
  templateUrl: './svg-icon.component.html',
})
export class SvgIconComponent {
  constructor() {}
  @Input('icon') iconToRender: string;
}
