import { Component, Input, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home-list-item',
  styleUrls: ['./list-item.component.scss'],
  template: `
    <mat-list-item
      matRipple
      [matRippleDisabled]="true"
      class="list-item"
      (click)="handleClick()"
    >
      <div mat-list-icon>{{ index }}.</div>
      <div class="primary-text" mat-line>
        {{ primaryText }}
      </div>
      <div class="secondary-text" mat-line>{{ secondaryText }}</div>
    </mat-list-item>
  `,
})
export class ListItemComponent {
  @Input('primaryText') primaryText: string;
  @Input('secondaryText') secondaryText: string;
  @Input('metaText') metaText: string;
  @Input('index') index: number;
  @Input('link') link: any[];

  constructor(private router: Router) {}

  @ViewChild(MatRipple) ripple: MatRipple;

  handleClick() {
    this.ripple.launch({
      animation: {
        enterDuration: 150,
        exitDuration: 250,
      },
      centered: true,
    });

    setTimeout(() => this.router.navigate(this.link), 100);
  }
}
