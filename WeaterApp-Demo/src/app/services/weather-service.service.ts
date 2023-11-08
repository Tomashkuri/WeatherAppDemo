import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {
  private apiKey = 'bso4cOFNx7yhMF7ZSM1yGjYveuGJamFl';
  private baseUrl = 'http://dataservice.accuweather.com';

  constructor(private http:HttpClient) { }
  searchLocation(query: string) {
    return this.http.get<any[]>(`${this.baseUrl}/locations/v1/cities/autocomplete`, {
      params: {
        apikey: this.apiKey,
        q: query,
      },
    });
  }

getCurrentWeather(locationKey: string) {
  return this.http.get(`${this.baseUrl}/currentconditions/v1/${locationKey}`, {
    params: {
      apikey: this.apiKey,
    },
  });
}

getFiveDayForecast(locationKey: string) {
  return this.http.get(`${this.baseUrl}/forecasts/v1/daily/5day/${locationKey}`, {
    params: {
      apikey: this.apiKey,
    },
  });
}
}
