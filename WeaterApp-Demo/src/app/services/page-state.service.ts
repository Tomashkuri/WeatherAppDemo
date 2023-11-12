import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { weather } from '../models/weather';

@Injectable({
  providedIn: 'root'
})
export class PageStateService {
  private selectedWeather = new BehaviorSubject<any>(null);
  selectedWeather$ = this.selectedWeather.asObservable();
  private currentPage = 'weather';
  private isMetric = new BehaviorSubject<boolean>(true);
  isMetric$ = this.isMetric.asObservable();
  constructor() { }

  setCurrentPage(page: string) {
    this.currentPage = page;
  }

  getCurrentPage() {
    return this.currentPage;
  }
  
  setSelectedFavorite(favorite:weather){
    this.selectedWeather.next(favorite);
  }
  clearSelectedFavorite(){
    this.selectedWeather.next(null);
  }

  getIsMetric(){
    return this.isMetric;
  }
  setMetric(value: boolean) {
    this.isMetric.next(value);
  }
}
