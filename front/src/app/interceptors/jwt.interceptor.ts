import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SessionService } from "../services/session/session.service";
import { Observable, catchError, throwError } from "rxjs";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({providedIn:"root"})
export class JwtInterceptor implements HttpInterceptor{
    
    constructor(private sessionService: SessionService, private router: Router, public matSnackBar: MatSnackBar,) {}

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        if(this.sessionService.isLogged){
            request = request.clone({
                setHeaders:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                
            })
        }
        return next.handle(request).pipe(catchError(err => {
            if([401,403].includes(err.status)){
                this.matSnackBar.open('Session expirée, veuillez vous reconnecter', 'Fermer', {duration: 10000});
                localStorage.removeItem('token');
                this.router.navigate(['/welcome']);
                this.sessionService.logOut();
            }
            return throwError(() => err)
        }));
    }
}