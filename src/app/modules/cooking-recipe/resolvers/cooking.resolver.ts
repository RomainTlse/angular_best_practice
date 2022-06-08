import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpRequestService } from '../../../core/utils/services/http-request.service';

@Injectable({
  providedIn: 'root',
})
export class CookingResolver implements Resolve<any> {
  constructor(private _httpRequestService: HttpRequestService) {}
  resolve(): Observable<any> {
    return this._httpRequestService.getDatas<Array<any>>('assets/documents/cooking.json');
  }
}
