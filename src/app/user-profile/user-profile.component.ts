import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { MovieDetailCardComponent } from '../movie-detail-card/movie-detail-card.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  favMov: any = [];
  user: any = {};
  movies: any[] = [];
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
    public snackBar: MatSnackBar
  ) { }

  /**
   * Initializes the component
   */
  ngOnInit(): void {
    this.getUser();
    this.getFav();
    this.getMovies();
  }

  /**
   * Retrieve's userData from localStorage
   */
  getUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      // return this.user
    });
  }

  /**
   * Retrieves list of favorites from DB
   */
  getFav(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies.map((x: any) => x._id);
      console.log(this.favorites);
      return this.filterMovies();
    });
    // this.ngOnInit();
  }

  /**
   * searches user's favorite movies and compares it to API
   * @returns function list of favorite movies
   */
  filterMovies(): void {
    this.movies.forEach((movie: any) => {
      if (this.favorites.includes(movie._id)) {
        this.favMov.push(movie);
      }
    });
    console.log(this.favMov);
  
    return this.favMov;
  }

  /**
   * Retrieves list of all movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    })
  }

  /**
   * Retrieves data of movie's genre
   * @param name {string}
   * @param description {string}
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {name, description},
    })
  }

  /**
   * Retrieves data on movie's Director
   * @param name {string}
   * @param bio {string}
   * @param birth {string || Date}
   */
  openDirectorDialog(name: string, bio: string, birth: any): void {
    this.dialog.open(DirectorCardComponent, {
      data: {name, bio, birth},
    });
  }

  /**
   * Retrieves data on movie details
   * @param title {string}
   * @param description {string}
   */
  openMovieDetailDialog(title: string, description: string): void {
    this.dialog.open(MovieDetailCardComponent, {
      data: {title, description},
    });
  }

  /**
   * Open's modal to edit profile
   */
  openEditProfile(): void {
    this.dialog.open(EditProfileComponent, {
      width: '280px',
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
    // return this.getFav();
  }
  
  /**
   * Removes favorite movie from User's array in DB.
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
      // setTimeout(function () {
      //   window.location.reload();
      // }, 1000);
    });
    // this.ngOnInit();
    // return this.getFav();
  }

  inFavorites(movieId: any): boolean {
    if (this.favorites.indexOf(movieId) > -1) {
      return true;
    } else {
      return false;
    }
  }
}
