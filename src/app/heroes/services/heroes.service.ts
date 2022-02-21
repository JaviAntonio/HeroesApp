import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { heroe } from '../interfaces/heroe.interfaces';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseURL;

  get httpParams(){
    return new HttpParams().set('fields','superhero');
  }

  constructor(private http: HttpClient) { }

    getHeroes(): Observable<heroe[]> {
      return this.http.get<heroe[]>(`${this.baseUrl}/heroes`)
    }
    getHeroePorId(id:string):Observable<heroe>{
      return this.http.get<heroe>(`${this.baseUrl}/heroes/${id}` )
    }

    getBuscando(termino:string): Observable<heroe[]>{
        return this.http.get<heroe[]>(`${this.baseUrl}/heroes?q=${termino}&_limit=4`)
    }
    agregarHeroe(heroe: heroe): Observable<heroe>{
      return this.http.post<heroe>(`${this.baseUrl}/heroes`,heroe)
    }
    actualizarHeroe(heroe: heroe):Observable<heroe>{
      return this.http.put<heroe>(`${this.baseUrl}/heroes/${heroe.id}`,heroe)
    }
    eliminarHeroe(id: string):Observable<any>{
      return this.http.delete<any>(`${this.baseUrl}/heroes/${id}`)
    }
}
