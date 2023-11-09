import { Injectable } from '@angular/core';
import { weather } from '../models/weather';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private data: weather[];

  constructor() {
    this.loadData();
  }

  private loadData(): void {
    const storedData = localStorage.getItem('favoriteWeatherList');
    this.data = storedData ? JSON.parse(storedData) : null;
  }
  
  getData(): any {
    return this.data;
  }
  searchWeather(locationKey:string):boolean{
    if(this.data === null)
      return false;
    console.log("searchWeather: "+locationKey)
    let exist = this.data.filter((item) => item.Key === locationKey);

    console.log(`exist:  ${exist}`)
    return exist.length>0;
  }
  addTofavorite(weather:weather): void {
    if (this.data !==null){
      this.data.push(weather);
    }else{
      this.data = [weather];
    }
    localStorage.setItem('favoriteWeatherList', JSON.stringify(this.data));
  }
  removeFromFavorite(weather:weather): void {
    if (this.data === null) {
      return;
    }
    this.data = this.data.filter((item) => item.Key !== weather.Key);
    localStorage.setItem('favoriteWeatherList', JSON.stringify(this.data));
  }
}