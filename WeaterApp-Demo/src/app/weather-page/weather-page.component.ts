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
  currentWeather: any = {};
  code: number = 1;

  defaultWeather:weather = 
  { Key: '215854',
    cityName: 'Tel Aviv',
    temperature: {Metric:{value: 20, unit: 'C', UnitType: 17},
                  Imperial:{value: 68, unit: 'F', UnitType: 18}},
    WeatherText: 'Sunny'};
  

  constructor(private weatherService:WeatherServiceService) {}
  
  ngOnInit(): void {
    console.log(`WeatherPageComponent initialized`);
    //tel aviv code 215854
    this.weatherService.getCurrentWeather('215854').subscribe((weather:any) => {
      let new_weather = {};
      if(weather.length > 0){
        new_weather = {Key: '215854',
                      cityName: 'Tel Aviv',
                      temperature: weather[0].Temperature,
                      WeatherText: weather[0].WeatherText};
        this.currentWeather = new_weather;
      }
      else{
        this.currentWeather = this.defaultWeather;
       }
       this.code = weather[0].WeatherIcon;
    });
  }
   
  searchLocations(){  
    if (this.searchQuery && this.searchQuery.length > 3){
      this.weatherService.searchLocation(this.searchQuery).subscribe((results) => {
        this.searchResults = results;
      });
    } else {
      this.searchResults = [];
    } 
  }

  selectLocation(location:Location) {
    this.weatherService.getCurrentWeather(location.Key).subscribe((weather:any) => {
      let new_weather = {};
      if(weather.length > 0){
        new_weather = {Key: location.Key,
                      cityName: location.LocalizedName,
                      temperature: weather[0].Temperature,
                      WeatherText: weather[0].WeatherText};
        // this.currentWeather = weather[0];
        this.currentWeather = new_weather;
        this.code = weather[0].WeatherIcon;
        console.log(this.currentWeather.cityName);
      }
    });
    this.searchResults = [];
  }

  isDay(observationTime:any){
    const dateTime = new Date(observationTime);
    const hour = dateTime.getHours();
    return hour > 6 && hour < 18;
  }
}