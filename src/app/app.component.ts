import { LanguageService } from './services/language/language.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
   this.languageService.setInitialAppLanguage();
  }
}
