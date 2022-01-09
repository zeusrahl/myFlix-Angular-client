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

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getFav();
    this.getMovies();
  }

  getUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user
    });
  }

  getFav(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies.map((x: any) => x._id);
      console.log(this.favorites);
      return this.filterMovies();
    });
  }

  filterMovies(): void {
    this.movies.forEach((movie: any) => {
      if (this.favorites.includes(movie._id)) {
        this.favMov.push(movie);
      }
    });
    console.log(this.favMov);
    return this.favMov;
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    })
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

  openEditProfile(): void {
    this.dialog.open(EditProfileComponent, {
      width: '280px',
    });
  }

  removeFavMovie(movieId: any, title: string): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.deleteMovie(movieId).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(`You successfuly removed ${title} from your favorites list`, 'OK', {
        duration: 4000,
      });
    });
    this.ngOnInit();
  }
}
