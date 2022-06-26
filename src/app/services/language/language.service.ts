import { Storage } from '@ionic/storage-angular';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const LNG_KEY = 'SELECTED_LANGUAGE';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  selected = '';

  constructor(private translate: TranslateService, private storage: Storage) {}

  setInitialAppLanguage() {
    let language = this.translate.getBrowserLang();
    this.translate.setDefaultLang(language);
    this.storage.create();

    this.storage.get(LNG_KEY).then((val) => {
      if (val) {
        this.setLanguage(val);
        this.selected = val;
      }
    });
  }

  getLanguage() {
    return [
      {
        text: 'Português',
        value: 'pt',
      },
      {
        text: 'English',
        value: 'en',
      },
    ];
  }

  setLanguage(lng) {
    this.translate.use(lng);
    this.selected = lng;
    this.storage.set(LNG_KEY, lng);
  }
}
