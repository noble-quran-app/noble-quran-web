import { Juzs, Sajdas, Surahs } from '../data/quran';

export const getRangeForSurah = (surahNumber: number) => {
  const surah = Surahs.find((surah) => surah.id == surahNumber);
  const [start, end] = surah?.range?.split('-');
  return {
    start: parseInt(start),
    end: parseInt(end),
  };
};

export const getRangeForJuz = (juzNumber: number) => {
  const juz = Juzs.find((juz) => juz.index === juzNumber);
  const [start, end] = juz?.range?.split('-');
  return {
    start: parseInt(start),
    end: parseInt(end),
  };
};

export const getRangeForSajda = (sajdaNumber: number) => {
  const sajda = Sajdas.find((sajda) => sajda.index === sajdaNumber);
  return {
    start: sajda.ayahId,
    end: sajda.ayahId,
  };
};

export const generateMenuList = {
  forSurah: () => {
    return Surahs.map(({ englishName, id }) => ({
      index: id,
      link: `/${id}`,
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
  forSajda: () => {
    return Sajdas.map(({ index }) => ({
      index,
      title: `Sajda ${index}`,
      link: `/sajda/${index}`,
    }));
  },
};

export const Timer = (time: number) => {
  return new Promise<null>((res) => setTimeout(() => res(null), time));
};

export const getAyahAudioUrl = (id: number) => {
  return `https://cdn.islamic.network/quran/audio/64/ar.alafasy/${id}.mp3`;
};
