export interface Surah {
  englishName: string;
  arabicName: string;
  ayahs: number;
  english: string;
  place: string;
  index: number;
}

export interface Juz {
  title: string;
  subTitle: string;
  ayahCount: number;
  index: number;
}
export interface Sajda {
  surahNo: number;
  ayahNo: number;
  juzNo: number;
  isObligatory: boolean;
  index: number;
}
