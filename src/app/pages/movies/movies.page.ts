import { Component, OnInit } from '@angular/core';
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
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies = [];
  currentPage = 1;
  imageBaseUrl = environment.images;
  profile = null;

  constructor(
    private serviceMovie: MovieService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private authService: AuthService,
    private avatarService: AvatarService,
    private alertController: AlertController
  ) {
    this.avatarService.getUserProfile().subscribe((data) => {
      this.profile = data;
    });
  }

  ngOnInit() {
    this.moviesPopular();
  }

  async moviesPopular(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Loanding...',
      spinner: 'dots',
    });
    await loading.present();

    this.serviceMovie.getTopRatedMovies(this.currentPage).subscribe({
      next: (res) => {
        loading.dismiss();
        this.movies.push(...res.results);

        event?.target.complete();
        if (event) {
          event.target.disabled = res.total_pages === this.currentPage;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  loadMore(event) {
    this.currentPage++;
    this.moviesPopular(event);
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
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
}
