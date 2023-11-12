import { Component,Input,OnInit } from '@angular/core';
import { WeatherServiceService } from '../services/weather-service.service';
import { LocalStorageService } from '../services/local-storage.service';
import { weather } from '../models/weather';
import { PageStateService } from '../services/page-state.service';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css']
})
export class FavoritesPageComponent implements OnInit{

  favorites: any;
  constructor(private weatherService:WeatherServiceService,private localStorageService:LocalStorageService,private pageStateService:PageStateService) { }

  ngOnInit(): void {
    console.log(`FavoritePageComponent initialized`);
    this.favorites = this.localStorageService.getData();
  }
  displaySelectedWeather(weather:weather):void{
    this.pageStateService.setSelectedFavorite(weather);
    this.pageStateService.setCurrentPage('weather');
  }
  getIsMetric():boolean{
    return this.pageStateService.getIsMetric().getValue();
  }
}
