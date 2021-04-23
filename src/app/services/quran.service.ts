import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { getAyahURL } from 'src/assets/quran/helpers';
import { getRangeForSurah, range } from '../core/functions';

@Injectable({
  providedIn: 'root',
})
export class QuranService {
  constructor(private http: HttpClient) {}

  private ayahListSource = new BehaviorSubject([]);
  private finishedLoading = 0;
  private rangeToLoad = [];
  private isLoading = false;

  public ayahList = this.ayahListSource.asObservable();

  async getAyahs(from: number, to: number) {
    return Promise.all(
      range(from, to).map((ayahNo) => {
        return Promise.all([
          this.http.get(getAyahURL(ayahNo, 'ar')).toPromise(),
          this.http.get(getAyahURL(ayahNo, 'tr')).toPromise(),
        ]).then((data) => {
          return data.reduce((prev: any, curr: any) => {
            return {
              ...prev,
              ar: curr,
              // ar: curr[0].text,
              // tr: curr[1].text,
              // number: curr[0].number,
            };
          }, {});
        });
      })
    );
  }

  clearAyahs() {
    this.ayahListSource.next([]);
  }

  async getSurah(surahNo: number) {
    this.ayahListSource.next([]);
    const [start, end] = getRangeForSurah(surahNo);
    const res = await this.getAyahs(start, end);
    console.log(res);
    // this.ayahListSource.next(res);
    // .pipe(catchError(this.handleError('getSites', [])))
  }
}
