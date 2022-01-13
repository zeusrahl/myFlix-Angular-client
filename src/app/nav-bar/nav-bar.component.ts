import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  /**
   * Constructor items are documents as properties
   * @ignore
   * @param router 
   */
  constructor(
    public router: Router,
  ) { }

  /**
   * Initiates the component
   * @ignore
   */
  ngOnInit(): void {
  }

  /**
   * Routes to 'movies' page
   */
  toMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Routes to 'profile' page
   */
  toProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Routes to 'welcome' page, and clears localstorage to log user out.
   */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome'])
  }

}
