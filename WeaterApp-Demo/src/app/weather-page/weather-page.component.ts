import { Component } from '@angular/core';
import { WeatherServiceService } from '../services/weather-service.service';
import { Location } from '../models/location';
import { weather } from '../models/weather';

@Component({
  selector: 'app-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.css']
})
export class WeatherPageComponent {
  searchQuery: string = '';
  searchResults: any[] = [];
  currentWeather: any;

  constructor(private weatherService:WeatherServiceService) {}
  ngoninit(): void {
    console.log(`WeatherPageComponent initialized`);
  }  
  searchLocations(){  
  if (this.searchQuery){
      this.weatherService.searchLocation(this.searchQuery).subscribe((results) => {
        this.searchResults.push(results);
      });
    }
   }

   selectLocation(location:Location) {
    this.weatherService.getCurrentWeather(location.Key).subscribe((weather) => {
      this.currentWeather = weather;
    });
  }
}