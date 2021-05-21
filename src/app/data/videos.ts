import { QuranVideo } from '../core/models';

export const Reciters = {
  abdur_rahman: {
    name: "Abdul'rahman al Ausi",
    full_name: "Abdul'rahman Ben Gamal al Ausi",
  },
  raad_muhammad: {
    name: 'Mohammad Al Kurdi',
    full_name: 'Raad Mohammad Al Kurdi',
  },
  abdallah_humeid: {
    name: 'Abdallah Humeid',
    full_name: 'Abdallah Humeid',
  },
};

const Videos = [
  {
    description:
      'Best Quran Recitation in the World 2016 Emotional Recitation |Heart Soothing by Abdur Rahman Al Ossi',
    videoId: 'ef8Ci5Zc3ZA',
    surahId: 69,
    reciter: Reciters.abdur_rahman,
  },
  {
    videoId: '33rtr3fZvi0',
    description: 'Surah Yaseen Extremely Powerful Quran',
    surahId: 36,
    reciter: Reciters.abdallah_humeid,
  },
  {
    description: 'Best Quran recitation to The Prophet Moses and Pharaoh story by Raad alkurdi',
    videoId: 'JWt5_NJuhME',
    surahId: 20,
    reciter: Reciters.raad_muhammad,
  },
  {
    videoId: 'YWObWp1CrhE',
    surahId: 55,
    description: 'Ar Rahman - soul touching',
    reciter: Reciters.abdallah_humeid,
  },
  {
    videoId: 'oB14FKhqDwA',
    surahId: 79,
    description: 'Emotional Quran recitation by Qari Muhammad Al Kurdi',
    reciter: Reciters.raad_muhammad,
  },
];

export const QuranVideos: QuranVideo[] = Videos.map((video) => ({
  ...video,
  thumbnails: {
    large: `//i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
    medium: `//i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`,
    small: `//i.ytimg.com/vi/${video.videoId}/default.jpg`,
  },
}));
