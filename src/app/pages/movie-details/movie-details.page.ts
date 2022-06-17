import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movie = null;
  imageBaseUrl = environment.images;

  constructor(
    private route: ActivatedRoute,
    private serviceMovie: MovieService
  ) {}

  ngOnInit() {
    this.movieDetails();
  }

  movieDetails() {
    const id = this.route.snapshot.paramMap.get('id');
    this.serviceMovie.getMoviesDetails(id).subscribe({
      next: (res) => {
        this.movie = res;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  openHome() {
    window.open(this.movie.homepage);
  }
}
