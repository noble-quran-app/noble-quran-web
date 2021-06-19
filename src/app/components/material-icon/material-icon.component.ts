import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'material-icon',
  templateUrl: './material-icon.component.html',
  styleUrls: ['./material-icon.component.scss'],
})
export class MaterialIconComponent {
  @Input('size') size: number = 24;

  @HostBinding('style.font-size.px') get invalid() {
    return this.size;
  }
}
