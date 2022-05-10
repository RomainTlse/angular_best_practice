import { Component, OnDestroy } from '@angular/core';
import { Loader } from '../../interfaces/loader';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.sass'],
})
export class LoaderComponent implements OnDestroy {
  show = false;
  private _subscription: Subscription;

  constructor(private _loaderService: LoaderService) {
    this._subscription = this._loaderService.loaderState.subscribe((state: Loader) => {
      this.show = state.show;
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
