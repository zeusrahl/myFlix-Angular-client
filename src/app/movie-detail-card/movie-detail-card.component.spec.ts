import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailCardComponent } from './movie-detail-card.component';

describe('MovieDetailCardComponent', () => {
  let component: MovieDetailCardComponent;
  let fixture: ComponentFixture<MovieDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieDetailCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
