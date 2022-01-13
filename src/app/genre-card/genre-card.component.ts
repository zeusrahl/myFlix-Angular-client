import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['./genre-card.component.scss']
})
export class GenreCardComponent implements OnInit {

  /**
   * Constructor items are documents as properties
   * @ignore
   * @param data 
   */
  constructor(@Inject(MAT_DIALOG_DATA)
    public data: {
      name: string,
      description: string
    }
  ) { }

  /**
   * Initializes the component
   * @ignore
   */
  ngOnInit(): void {
  }

}
