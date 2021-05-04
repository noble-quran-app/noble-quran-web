import { Juzs, Surahs } from '../data/quran';

export const getRangeForSurah = (surahNumber: number) => {
  const surah = Surahs.find((surah) => surah.index == surahNumber);
  const [start, end] = surah?.range?.split('-');
  return {
    start: parseInt(start),
    end: parseInt(end),
  };
};

export const getRangeForJuz = (juzNumber: number) => {
  const juz = Juzs.find((juz) => juz.index == juzNumber);
  const [start, end] = juz?.range?.split('-');
  return {
    start: parseInt(start),
    end: parseInt(end),
  };
};

export const generateMenuList = {
  forSurah: () => {
    return Surahs.map(({ englishName, index }) => ({
      index,
      link: `/${index}`,
      title: englishName,
    }));
  },
  forJuz: () => {
    return Juzs.map(({ title, index }) => ({
      index,
      title,
      link: `/juz/${index}`,
    }));
  },
};

export const Timer = (time: number) => {
  return new Promise<null>((res) => setTimeout(() => res(null), time));
};

export const getAyahAudioUrl = (id: number) => {
  return `https://cdn.islamic.network/quran/audio/64/ar.alafasy/${id}.mp3`;
};
