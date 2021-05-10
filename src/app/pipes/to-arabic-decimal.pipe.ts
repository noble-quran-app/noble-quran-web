import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toArabicDecimal',
})
export class ToArabicNumberPipe implements PipeTransform {
  transform(number: number, operation = 0): string {
    const int = number + operation;
    return int
      .toString()
      .replace(/[0-9]/g, (i) => ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'][+i]);
  }
}
