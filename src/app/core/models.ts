export interface Surah {
  englishName: string;
  arabicName: string;
  ayahs: number;
  english: string;
  place: string;
  index: number;
  range: string;
  startsWithoutBismillah?: boolean;
}

export interface Juz {
  title: string;
  subTitle: string;
  ayahCount: number;
  index: number;
  range: string;
}
export interface Sajda {
  surahNo: number;
  ayahNo: number;
  juzNo: number;
  isObligatory: boolean;
  index: number;
}

export interface AyahRange {
  start: number;
  end: number;
}

export interface Theme {
  id: string;
  className: string;
  primary_theme_color: string;
  appbar_background_color: string;
}

export interface QuranEdition {
  edition: Edition;
  ayahs: string[];
}

export interface Edition {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
}

export interface AyahReadyStateChange {
  ready: boolean;
  error: string;
  index: number;
}
