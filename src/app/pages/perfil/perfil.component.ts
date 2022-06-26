import { AfterViewInit, Component, Input, OnInit, Output } from '@angular/core';
import {
  AlertController,
  InfiniteScrollCustomEvent,
  LoadingController,
} from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AvatarService } from 'src/app/services/avatar/avatar.service';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  imageBaseUrl = environment.images;
  profile: any;

  constructor(
    private serviceMovie: MovieService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private authService: AuthService,
    private avatarService: AvatarService,
    private alertController: AlertController
  ) {}

  ngAfterViewInit(): void {
    const time = setTimeout(() => {
      this.avatarService.getUserProfile().subscribe((data) => {
        this.profile = data;
      });
    }, 3000);
  }

  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });

    if (image) {
      const loading = await this.loadingCtrl.create();
      await loading.present();

      const res = await this.avatarService.uploadImage(image);
      loading.dismiss();

      if (!res) {
        const alert = await this.alertController.create({
          header: 'Upload Falhou',
          message: 'Houve um problema ao fazer o uploading do seu avatar',
          buttons: ['OK'],
        });

        await alert.present();
      }
    }
  }

  ngOnInit() {}
}
