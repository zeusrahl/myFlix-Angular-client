import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-detail-card',
  templateUrl: './movie-detail-card.component.html',
  styleUrls: ['./movie-detail-card.component.scss']
})
export class MovieDetailCardComponent implements OnInit {

  /**
   * Constructor items are documents as properties
   * @ignore
   * @param data {object}
   */
  constructor(@Inject(MAT_DIALOG_DATA)
    public data: {
      title: string,
      description: string
    }
  ) { }

  /**
   * Initiates the component
   * @ignore
   */
  ngOnInit(): void {
  }
}
