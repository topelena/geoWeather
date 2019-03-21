import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError as observableThrowError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'



@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  ipLookUp(): Observable<any> {
    return this.http.get<any>('http://ip-api.com/json')
      .pipe(
        catchError(this.handleError))

  }
  private handleError(res: HttpErrorResponse) {
    return observableThrowError(res.error || 'Server error')
  }

  getWeather(city: string): Observable<any> {
    return this.http.get<any>(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=c34a5182b60d6b5690b7456f142def7c`)
      .pipe(
        map(response => {
          console.log(response);
          return response

        }))
  }
  getWeatherByLocation(lat, lon): Observable<any> {
    return this.http.get<any>(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=c34a5182b60d6b5690b7456f142def7c`)
      .pipe(
        map(response => {
          console.log(response);
          return response

        }))
  }

}

