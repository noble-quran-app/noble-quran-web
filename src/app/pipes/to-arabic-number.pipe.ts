import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toArabicNumber',
})
export class ToArabicNumberPipe implements PipeTransform {
  transform(number: number, increament: boolean): string {
    const int = increament ? number + 1 : number;
    return int
      .toString()
      .replace(
        /[0-9]/g,
        (i) => ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'][+i]
      );
  }
}
