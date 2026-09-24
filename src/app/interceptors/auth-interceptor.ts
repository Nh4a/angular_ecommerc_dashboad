import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import {Router} from '@angular/router';
import { inject } from '@angular/core';

export const withToken = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const token = localStorage.getItem('token');
  if (token) {
    const cloned = req.clone({ setHeaders: { Authorization: `Bearer ${JSON.parse(token)}` } });

    return next(cloned);
  }
  return next(req);
};

export const errorHandler:HttpInterceptorFn = (req : HttpRequest<any>, next:HttpHandlerFn) =>{

  const router:Router = inject<Router>(Router);

  return next(req).pipe(
    catchError( (res: HttpErrorResponse) => {


      const status = res.status;

      switch (status) {
        case 401: {
          router.navigate(['/login'])
          break;
        }
        case 403:  router.navigate(['/unauthorize']); break;
      }

      return throwError(() => res);
    }),
  );
}
