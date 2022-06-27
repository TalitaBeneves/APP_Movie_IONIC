import { LanguageService } from './../../services/language/language.service';
import { AvatarService } from 'src/app/services/avatar/avatar.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MovieService } from 'src/app/services/movie/movie.service';
import {
  AlertController,
  LoadingController,
  MenuController,
} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() isAuth: boolean = true;
  language = [];
  selected: any;
  profile: any;
  id;
  constructor(
    private router: Router,
    private authService: AuthService,
    private languageService: LanguageService,
    private serviceMovie: MovieService,
    private loadingCtrl: LoadingController,
    private avatarService: AvatarService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.language = this.languageService.getLanguage();
    this.selected = this.languageService.selected;
  }

  ngAfterViewInit(): void {
    const time = setTimeout(() => {
      this.avatarService.getBackgroundImg().subscribe((data) => {
        this.profile = data[0];
        console.log('a', data);
      });
    }, 3000);
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  select(lng) {
    this.languageService.setLanguage(lng);
    this.selected = lng;
  }

  notes() {
    this.router.navigate(['/notes']);
  }

  async uploadBackgroundImg() {
    const background = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });

    if (background) {
      const loading = await this.loadingCtrl.create();
      await loading.present();

      const res = await this.avatarService.uploadbImage(background);
      location.reload();
      loading.dismiss();

      if (!res) {
        console.log(res);
        const alert = await this.alertController.create({
          header: 'Upload Falhou',
          message: 'Houve um problema ao fazer o uploading do seu avatar',
          buttons: ['OK'],
        });

        await alert.present();
      }
    }
  }
}
