import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private router:Router) { }

  handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401 || err.status === 403) {
        //navigate /delete cookies or whatever
        this.router.navigateByUrl(`/login`);
        // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
        return of(err.message); // or EMPTY may be appropriate here
    }
    return throwError(()=>err);
}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header.
        
        const authReq = req.clone({headers: req.headers.set("WS_JWT", "BearereyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3ZWlzaHVubGltOTNAaG90bWFpbC5jb20iLCJpYXQiOjE2ODE4MzE3MzgsImV4cCI6MTY4MTkxODEzOH0.-1f88yyWSduGkBTFhJlrEM_aYS_-A4qCsYTs3LylmGo")});
        // catch the error, make specific functions for catching specific errors and you can chain through them with more catch operators
        return next.handle(authReq).pipe(catchError(x=> this.handleAuthError(x))); //here use an arrow function, otherwise you may get "Cannot read property 'navigate' of undefined" on angular 4.4.2/net core 2/webpack 2.70
    }
}
