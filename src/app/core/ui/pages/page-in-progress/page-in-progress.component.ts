import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-page-in-progress',
  templateUrl: './page-in-progress.component.html',
  styleUrls: ['./page-in-progress.component.sass'],
})
export class PageInProgressComponent implements OnInit {
  public releaseDate!: string;
  public title!: string;

  public days!: number;
  public hours!: number;
  public minutes!: number;
  public seconds!: number;

  public showCountDown!: boolean;
  public showReleaseDate!: boolean;

  constructor(private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe(data => {
      this.releaseDate = data['date'] || localStorage.getItem('dateProgressPage');
    });
  }
  ngOnInit() {
    this.title = 'countdownReleaseDate';
    this.showCountDown = true;
    this.showReleaseDate = false;

    const countDown = new Date(this.releaseDate).getTime(),
      x = setInterval(() => {
        const now = new Date().getTime(),
          distance = countDown - now;

        this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

        //do something later when date is reached
        if (distance < 0) {
          this.title = 'bigDay';
          this.showCountDown = false;
          this.showReleaseDate = true;
          clearInterval(x);
        }
        //seconds
      }, 0);
  }
}
