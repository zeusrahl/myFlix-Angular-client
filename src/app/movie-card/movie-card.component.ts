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

  /**
   * Constructor items are documents as properties
   * @ignore
   * @param fetchApiData 
   * @param dialog 
   * @param snackBar 
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  /**
   * Initializes the component, retrieving all movies and the user's favorites
   * @ignore
   */
  ngOnInit(): void {
    this.getMovies();
    this.getFav();
  }

  /**
   * Retrieves all movies from database
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    })
  }

  /**
   * Retrieve's User Favorite Movies
   */
  getFav(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies.map((x: any) => x._id);
      console.log(this.favorites);
      return (this.favorites);
    });
  }

  /**
   * Retrieves genre name and description from DB
   * @param name {string}
   * @param description {string}
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {name, description},
    })
  }

  /**
   * Retrieves director data from DB
   * @param name {string}
   * @param bio {string}
   * @param birth {string || date}
   */
  openDirectorDialog(name: string, bio: string, birth: any): void {
    this.dialog.open(DirectorCardComponent, {
      data: {name, bio, birth},
    });
  }

  /**
   * Retrieve's movie description
   * @param title {string}
   * @param description {string}
   */
  openMovieDetailDialog(title: string, description: string): void {
    this.dialog.open(MovieDetailCardComponent, {
      data: {title, description},
    });
  }

  /**
   * Adds movie to userData's FavoriteMovies
   * @param movieId {string}
   * @param title {string}
   * @returns function this.getFav()
   */
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

  /**
   * Removes movie from userData's FavoriteMovies
   * @param movieId {string}
   * @param title {string}
   * @returns function this.getFav()
   */
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

  /**
   * Determins if movie is in user's Favorite Movies
   * @param movieId {string}
   * @returns true || false
   */
  inFavorites(movieId: any): boolean {
    if (this.favorites.indexOf(movieId) > -1) {
      return true;
    } else {
      return false;
    }
  }
}
