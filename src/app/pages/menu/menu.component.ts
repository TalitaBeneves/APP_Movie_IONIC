import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  lang: any;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.lang = localStorage.getItem('lang') || 'pt';
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  change(lang) {
    localStorage.setItem('lang', lang.target.value);
    window.location.reload();
  }

  notes(){
    this.router.navigate(['/notes'])
  }
}
