import { Injectable } from '@angular/core';
import {hero, hero, hero, hero, hero} from './hero'
import {Observable , of} from 'rxjs';
import {MessageService} from './message.service';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {catchError , map , tap} from 'rxjs/operators';
import { HeroesComponent } from './heroes/heroes.component';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})


export class HeroService {


  
  private heroesUrl = 'api/heroes';  // URL to web api
  
  constructor(private messageService : MessageService , private http : HttpClient) { }

  getHeroes (): Observable<hero[]> {
    return this.http.get<hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log(`fetched heroes`)),
        catchError(this.handleError('getHeroes', []))
      );
  }
  

  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /* GET heroes whose name contains search term */
searchHeroes(term: string): Observable<hero[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<hero[]>(`api/heroes/?name=${term}`).pipe(
    tap(_ => this.log(`found heroes matching "${term}"`)),
    catchError(this.handleError<hero[]>('searchHeroes', []))
  );
}


  deleteHero (hero: hero | number): Observable<hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
  
    return this.http.delete<hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<hero>('deleteHero'))
    );
  }



  /** POST: add a new hero to the server */
addHero (hero: hero): Observable<hero> {
  return this.http.post<hero>(this.heroesUrl, hero, httpOptions).pipe(
    tap((hero: hero) => this.log(`added hero w/ id=${hero.id}`)),
    catchError(this.handleError<hero>('addHero'))
  );
}

  updateHero (hero: hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** GET hero by id. Will 404 if id not found */
getHero(id: number): Observable<hero> {
  const url = `${this.heroesUrl}/${id}`;
  return this.http.get<hero>(url).pipe(
    tap(_ => this.log(`fetched hero id=${id}`)),
    catchError(this.handleError<hero>(`getHero id=${id}`))
  );
}
}
