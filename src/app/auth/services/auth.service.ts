import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { auth } from '../interfaces/auth.interfaces';
import { tap, Observable, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private baseUrl: string = environment.baseURL;
  private _auth: auth | undefined;

  constructor(private http: HttpClient) { }


  verifcarautenticacion():Observable<boolean>{
      if (!localStorage.getItem('id')) {
        return of(false);
      }
      return this.http.get<auth>(`${this.baseUrl}/usuarios/1`)
        .pipe(
          map(auth => {
            this._auth = auth;
            return true;
          })
        );
  }

  get auth(): auth{
    return { ...this._auth!}
  }

 login(){
  return this.http.get<auth>(`${this.baseUrl}/usuarios/1`)
  .pipe(
    tap(auth => this._auth = auth),
    tap(auth => localStorage.setItem('id', auth.id))
    );
 } 

}
