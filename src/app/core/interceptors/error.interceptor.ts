import { Injectable, inject } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    private toastr = inject(ToastrService);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMsg = 'Unknown error occurred';

                if (error.error) {
                    if (typeof error.error === 'string') {
                        errorMsg = error.error;
                    } else if (error.error.message) {
                        errorMsg = error.error.message;
                    }
                } else if (error.message) {
                    errorMsg = error.message;
                }

                this.toastr.error(errorMsg, 'Error', {
                    timeOut: 4000,
                    progressBar: true,
                    closeButton: true,
                });

                return throwError(() => error);
            })
        );
    }
}
