import { Surahs } from '../data/home';

/** Returns an array from a number x to a number y. */
export const range = (x: number, y: number): number[] => {
  return new Array(y - x + 1).fill(null).map((_, index) => index + x);
};

export const getRangeForSurah = (surahNumber: number) => {
  const surah = Surahs.find((surah) => surah.index == surahNumber);
  const [start, end] = surah?.range?.split('-');
  return {
    start: parseInt(start),
    end: parseInt(end),
  };
};
