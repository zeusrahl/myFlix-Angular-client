import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { MovieDetailCardComponent } from '../movie-detail-card/movie-detail-card.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
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
      return this.movies;
    })
  }

  getFav(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies.map((x: any) => x._id);
      console.log(this.favorites);
      return (this.favorites);
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {name, description},
    })
  }

  openDirectorDialog(name: string, bio: string, birth: any): void {
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
    this.fetchApiData.addFavoriteMovies(movieId).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(`You added ${title} to your favorites list`, 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    });
   
    return this.getFav();
  }

  removeFavMovie(movieId: any, title: string): void {

    this.fetchApiData.deleteMovie(movieId).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(`You successfully removed ${title} from your favorites list`, 'OK', {
        duration: 4000,
      });
    });
    this.ngOnInit();
    return this.getFav();
  }

  inFavorites(movieId: any): boolean {
    if (this.favorites.indexOf(movieId) > -1) {
      return true;
    } else {
      return false;
    }
  }
}
