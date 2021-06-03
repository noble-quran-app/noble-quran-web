import { Component, Input } from '@angular/core';

@Component({
  selector: 'material-icon',
  templateUrl: './material-icon.component.html',
  styleUrls: ['./material-icon.component.scss'],
})
export class MaterialIconComponent {
  @Input('size') size: number = 24;
}
