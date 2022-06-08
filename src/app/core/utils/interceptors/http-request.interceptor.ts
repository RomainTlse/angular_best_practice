import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MessageService } from '../../ui/services/message.service';
import { LoaderService } from '../../ui/services/loader.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private _messageService: MessageService, private _loaderService: LoaderService, private _router: Router) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this._loaderService.hide();
        this._messageService.show({
          show: true,
          type: 'error',
          title: 'error.title',
          description: 'error.description',
        });
        this._router.navigate(['error-server']);
        return throwError(error.message);
      })
    );
  }
}
