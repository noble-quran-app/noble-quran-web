import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QuranEdition } from '../core/models';
import Localbase from 'localbase';
import { Timer } from '../core/functions';

@Injectable({
  providedIn: 'root',
})
export class IdbService {
  private dbName = 'NobleQuran';
  private translations = ['en.sahih'];

  private db = new Localbase(this.dbName);
  public dbReady = new BehaviorSubject<boolean>(false);

  async installArabicPacks() {
    const arabicEdition = 'quran.simple';

    try {
      if (await this.validate(arabicEdition)) {
        return true;
      }
      const data = await this.fetchQuranEdition(arabicEdition);
      const mappedData = data.ayahs.map((ayah, index) => {
        const [arabicText, numberInSurah] = ayah;
        return { arabicText, numberInSurah, _key: (index + 1).toString() };
      });
      await this.db.collection(arabicEdition).set(mappedData, { keys: true });
      await Timer(6000);
    } catch (error) {
      console.error(error);
    }
  }

  async installTranslationPacks() {
    for (let translation of this.translations) {
      if (await this.validate(translation)) {
        return true;
      }
      const data = await this.fetchQuranEdition(translation);
      const mappedData = data.ayahs.map((ayah, index) => ({
        translation: ayah,
        _key: (index + 1).toString(),
      }));
      await this.db.collection(translation).set(mappedData, { keys: true });
      await Timer(6000);
    }
  }

  async init() {
    this.db.config.debug = false;
    await this.installArabicPacks();
    await this.installTranslationPacks();

    this.dbReady.next(true);
  }

  async validate(collectionId: string) {
    const length = await this.db
      .collection(collectionId)
      .lf[collectionId].length();
    return length === 6236;
  }

  async fetchQuranEdition(edition: string): Promise<QuranEdition> {
    return fetch(`/assets/quran/edition/${edition}.json`)
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((data: QuranEdition) => {
        return data;
      })
      .catch(() => {
        return new Promise((resolve) => {
          setTimeout(() => resolve(this.fetchQuranEdition(edition)), 2000);
        });
      });
  }

  getAyahWithEditon(ayahId: number, edition: string) {
    return this.db.collection(edition).doc(ayahId.toString()).get();
  }

  async getAyahWithEditons(ayahId: number, editions: string[]) {
    try {
      const promises = editions.map((edition) => {
        return this.getAyahWithEditon(ayahId, edition);
      });
      const result = await Promise.all(promises);
      return result.reduce((prev, curr) => Object.assign(prev, curr), {});
    } catch (error) {
      return error?.message;
    }
  }
}
