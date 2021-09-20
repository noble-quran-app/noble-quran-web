export interface Surah {
  englishName: string;
  ayahs: number;
  english: string;
  place: string;
  id: number;
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
  numberInSurah: number;
  juzNo: number;
  isObligatory: boolean;
  index: number;
  ayahId: number;
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
  ayahs: any;
}

export interface Edition {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
}

export interface QuranVideo {
  description: string;
  videoId: string;
  surahId: number;
  thumbnails: {
    large: string;
    medium: string;
    small: string;
  };
  reciter: {
    name: string;
    full_name: string;
  };
}
export interface TabData {
  label: string;
  path: string;
}

export type ScrollPosition = [number, number];

export interface MediaSessionOptions {
  title: string;
  artwork?: MediaImage[];
  artist?: string;
  album?: string;
}
