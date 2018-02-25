import { Injectable } from '@angular/core';
import {
  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Tag } from '../tag';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    public auth: AuthService,
    private router: Router) {}

  intercept(request: HttpRequest<Tag>, next: HttpHandler): Observable<HttpEvent<any>> {

    // do not intercept browser requests (not asking the Instagram API, but requesting a webpage)
    if (request.url.includes('explore')) {
      return next.handle(request);
    }

    // add an access token to every request
    request = request.clone({
      setParams: {
        access_token: this.auth.getToken()
      }
    });

    // response handling
    return next.handle(request)

      // transform response and throw away meta data
      .map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.status === 200) {
          return event.clone( {
            body: event.body.data
          });
        }
        return event;
      })

      // handle errors
      .do((err: any) => {
        if (err instanceof HttpErrorResponse) {
          // problem with the access token, send to login
          if (err.error.meta.code === 400 && err.error.meta.error_type === 'OAuthAccessTokenException') {
            this.auth.setAuthenticationError();
            this.router.navigate(['/login']);
          }
        }
    });
  }
}
