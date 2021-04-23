export const getAyahURL = (ayahNo: number, type?: 'ar' | 'tr'): string => {
  const arabicEdition = localStorage.getItem('ar-edition');
  const translationEdition = localStorage.getItem('tr-edition');
  const edition = type === 'tr' ? translationEdition : arabicEdition;
  return `/assets/quran/ayah/${edition}/${ayahNo}.json`;
};
