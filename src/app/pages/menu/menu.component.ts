import { LanguageService } from './../../services/language/language.service';
import { AvatarService } from 'src/app/services/avatar/avatar.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MovieService } from 'src/app/services/movie/movie.service';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  isAuth: boolean = true;
  language = [];
  selected: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.language = this.languageService.getLanguage();
    this.selected = this.languageService.selected;
  }

  async logout() {
    await this.authService.logout();
    this.isAuth = false;
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  select(lng) {
    this.languageService.setLanguage(lng);
    this.selected = lng;
  }

  notes(){
    this.router.navigate(['/notes'])
  }
}
