import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
  standalone: true,
  imports: [TranslatePipe],
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.less']
})
export class LanguageSwitcherComponent {
  currentLang: string;

  constructor(private languageService: LanguageService) {
    this.currentLang = this.languageService.getCurrentLang();
    this.languageService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  setLanguage(lang: string): void {
    this.languageService.setLanguage(lang);
  }
}
