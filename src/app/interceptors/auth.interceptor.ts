import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');

    if(token) {
      //Clona o Authorization
      const cloneReq = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) })
      return next.handle(cloneReq);
    } else {
      return next.handle(request);
    }


  }
}
//Inves de passar as configurações no providers do angular,
//Nos passamos o const de AuthInterceptorProvider
export const AuthInterceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
]