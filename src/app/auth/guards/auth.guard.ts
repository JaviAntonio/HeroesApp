import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor (private authService:  AuthService,
                private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.verifcarautenticacion().pipe(
        tap(Autenticado => {
          if (!Autenticado) {
           this.router.navigate(['./auth/login'])
          }
        })
      );
  }
  canLoad(
    route: Route, 
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {


        return this.authService.verifcarautenticacion().pipe(
          tap(Autenticado => {
            if (!Autenticado) {
             this.router.navigate(['./auth/login'])
            }
          })
        );

  }
}
