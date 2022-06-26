import { AvatarService } from 'src/app/services/avatar/avatar.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MovieService } from 'src/app/services/movie/movie.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  lang: any;
  isAuth: boolean = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private serviceAvatar: AvatarService,
    private menu: MenuController
  ) {}

  ngOnInit() {
    this.lang = localStorage.getItem('lang') || 'pt';
  }

  async logout() {
    await this.authService.logout();
    this.isAuth = false;
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  change(lang) {
    localStorage.setItem('lang', lang.target.value);
    window.location.reload();
  }

  notes() {
    this.router.navigate(['/notes']);
  }
}
