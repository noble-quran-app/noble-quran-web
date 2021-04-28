// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { QuranEdition } from '../core/models';

// @Injectable({
//   providedIn: 'root',
// })
// export class IdbService {
//   private db: IDBOpenDBRequest;
//   public dbReady = new BehaviorSubject<boolean>(false);

//   private dbName = 'NobleQuranLocal';
//   private dbVersion = 4;
//   public requiredCollections = ['quran-simple', 'en.sahih'];
//   private requireExists: boolean;

//   constructor(private http: HttpClient) {}

//   init() {
//     this.db = indexedDB.open(this.dbName, this.dbVersion);
//     this.db.onsuccess = () => {
//       const { objectStoreNames } = this.db.result;
//       this.requireExists = this.requiredCollections.every((val) =>
//         objectStoreNames.contains(val)
//       );
//       if (this.requireExists) {
//         this.requiredCollections.forEach((storeId) => {
//           const transaction = this.db.result.transaction(storeId, 'readonly');
//           const objectStore = transaction.objectStore(storeId);
//           const countRequest = objectStore.count();
//           countRequest.onsuccess = () => {
//             if (countRequest.result !== 6236) {
//               this.fetchQuranEdition(storeId).then((data) => {
//                 data.ayahs.forEach((ayah) => {
//                   const transaction = this.db.result.transaction(
//                     storeId,
//                     'readwrite'
//                   );
//                   console.log('saving doc', ayah);
//                   transaction.objectStore(storeId).put(ayah);
//                 });
//               });
//             }
//           };
//         });
//       }
//     };
//     this.db.onupgradeneeded = () => {
//       if (!this.requireExists) {
//         console.log('Creating collections');
//         this.requiredCollections.forEach((collection) => {
//           this.db.result.createObjectStore(collection, { autoIncrement: true });
//         });
//       }
//     };
//   }

//   getAyahWithEditon(ayahId: number, edition: string) {
//     return new Promise((resolve, reject) => {
//       this.db.onsuccess = () => {
//         if (this.db.result.objectStoreNames.contains(edition)) {
//           const tx = this.db.result
//             .transaction(edition, 'readonly')
//             .objectStore(edition)
//             .get(ayahId);
//           tx.onsuccess = (ayah: any) => {
//             resolve(ayah.target.result);
//           };
//           tx.onerror = () => reject();
//         } else {
//           return [];
//         }
//       };
//     });
//   }

//   getAyahWithEditons(ayahId: number, editions: [string]) {
//     return new Promise((resolve, reject) => {
//       const promises = editions.map(async (edition) => {
//         return await this.getAyahWithEditon(ayahId, edition);
//       });
//       Promise.all(promises).then((dat) => resolve(dat));
//     });
//   }

//   async fetchQuranEdition(edition: string): Promise<QuranEdition> {
//     return this.http
//       .get(`/assets/quran/edition/${edition}.json`)
//       .toPromise()
//       .then((data: QuranEdition) => {
//         return data;
//       })
//       .catch(() => {
//         return this.fetchQuranEdition(edition);
//       });
//   }
// }
