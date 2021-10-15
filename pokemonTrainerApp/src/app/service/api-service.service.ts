import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  apiUrl:string = "https://pokeapi.co";

  constructor(private http: HttpClient) { }

  getPokemonData(){
    return this.http.get(this.apiUrl + "/api/v2/pokemon/ditto");
  }

  getPokemon(idOrname: string): Observable<any>{
    return this.http.get(this.apiUrl + `/api/v2/pokemon/${idOrname}`).pipe(
        catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);    //Rethrow it back to component
      }));
  }

  getLimitPokemon(maxNumber: number = 151){
    //https://pokeapi.co/api/v2/pokemon?limit=151
    return this.http.get(this.apiUrl + `/api/v2/pokemon?limit=${maxNumber}`).pipe(
      catchError((err) => {
      console.log('error caught in api service getLimitPokemon()')
      console.error(err);
      return throwError(err);    //Rethrow it back to component
    }));
  }
}

