import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  styleUrls: ['./director-card.component.scss']
})
export class DirectorCardComponent implements OnInit {

  /**
   * Constructor items are documents as properties
   * @ignore
   * @param data 
   */
  constructor( @Inject(MAT_DIALOG_DATA)
    public data: { name: string, bio: string, birth: any }
  ) { }

  /**
   * Initializes the component
   * @ignore
   */
  ngOnInit(): void {
  }

}
