import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { FetchApiDataService, Movie, User } from '../fetch-api-data.service';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { MovieDetailCardComponent } from '../movie-detail-card/movie-detail-card.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})



export class MovieCardComponent implements OnInit {
  movies: Array<Movie> = [];
  genres: any[] = [];
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFav();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
    })
  }

  getFav(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.getUser(user).subscribe((resp: User) => {
        this.favorites = resp.FavoriteMovies;
      });
    }
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {name, description},
    })
  }

  openDirectorDialog(name: string, bio: string, birth: Date): void {
    this.dialog.open(DirectorCardComponent, {
      data: {name, bio, birth},
    });
  }

  openMovieDetailDialog(title: string, description: string): void {
    this.dialog.open(MovieDetailCardComponent, {
      data: {title, description},
    });
  }

  addFavMovie(movieId: string, title: string): void {
    this.fetchApiData.addFavoriteMovies(movieId).subscribe((resp: string) => {
      console.log(resp);
      this.snackBar.open(`You added ${title} to your favorites list`, 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    });
   
    return this.getFav();
  }

  removeFavMovie(movieId: string, title: string): void {

    this.fetchApiData.deleteMovie(movieId).subscribe((resp: string) => {
      console.log(resp);
      this.snackBar.open(`You successfuly removed ${title} from your favorites list`, 'OK', {
        duration: 4000,
      });
    });
    this.ngOnInit();
    return this.getFav();
  }

  inFavorites(movieId: string): boolean {
    if (this.favorites.indexOf(movieId) > -1) {
      return true;
    } else {
      return false;
    }
  }
}
