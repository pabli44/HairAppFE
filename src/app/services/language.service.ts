import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly STORAGE_KEY = 'appLanguage';
  private readonly DEFAULT_LANG = 'en';

  private currentLangSubject = new BehaviorSubject<string>(this.DEFAULT_LANG);
  currentLang$ = this.currentLangSubject.asObservable();

  constructor(private translate: TranslateService) {}

  init(): void {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    const lang = saved === 'es' ? saved : this.DEFAULT_LANG;
    this.translate.use(lang);
    this.applyLang(lang);
  }

  setLanguage(lang: string): void {
    localStorage.setItem(this.STORAGE_KEY, lang);
    this.translate.use(lang);
    this.applyLang(lang);
  }

  getCurrentLang(): string {
    return this.currentLangSubject.getValue();
  }

  private applyLang(lang: string): void {
    document.documentElement.lang = lang;
    this.currentLangSubject.next(lang);
  }
}
