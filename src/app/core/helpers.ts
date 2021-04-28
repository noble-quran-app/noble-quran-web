export const getAyahURL = (ayahNo: number, type?: 'ar' | 'tr'): string => {
  const arabicEdition = localStorage.getItem('ar-edition');
  const translationEdition = localStorage.getItem('tr-edition');

  if (arabicEdition === null) {
    localStorage.setItem('ar-edition', 'quran-simple');
  }

  if (translationEdition === null) {
    localStorage.setItem('tr-edition', 'en.sahih');
  }

  const edition = type === 'tr' ? translationEdition : arabicEdition;
  return `/assets/quran/ayah/${edition}/${ayahNo}.json`;
};
