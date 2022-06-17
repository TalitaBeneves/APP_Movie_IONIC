import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MoviesModel } from 'src/model/movies';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getTopRatedMovies(page: number = 1): Observable<MoviesModel> {
    return this.http.get<MoviesModel>(
      `${environment.baseUrl}/movie/popular?api_key=${environment.apiKey}&page=${page}`
    );
  }

  getMoviesDetails(idMovie: any) {
    return this.http.get(
      `${environment.baseUrl}/movie/${idMovie}?api_key=${environment.apiKey}`
    );
  }
}
