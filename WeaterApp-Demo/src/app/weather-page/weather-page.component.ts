import { Component, OnInit } from '@angular/core';
import { WeatherServiceService } from '../services/weather-service.service';
import { Location } from '../models/location';
import { weather } from '../models/weather';
import { switchMap } from 'rxjs/operators';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.css']
})

export class WeatherPageComponent implements OnInit{
  searchQuery: string = '';
  searchResults: any[] = [];
  currentWeather: weather|any = {};
  fiveDayForecast: any[] = [];
  metric: boolean = true;
  code: number = 1;
  isFavorite: boolean = false;
  
  dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  defaultWeather:weather = 
  { Key: '215854',
    cityName: 'Tel Aviv',
    temperature: {Metric:{value: 20, unit: 'C', UnitType: 17},
                  Imperial:{value: 68, unit: 'F', UnitType: 18}},
    WeatherText: 'Sunny',
    WeatherIcon: 1};
  

  constructor(private weatherService:WeatherServiceService,private storageService:LocalStorageService) {}
  
  /*ngOnInit(): void {
    console.log(`WeatherPageComponent initialized`);
    //tel aviv code 215854
    this.weatherService.getCurrentWeather('215854').pipe(
    .subscribe((weather:any) => {
      console.log(weather[0]);
      let new_weather = {};
      if(weather[0].length > 0){
        console.log("inside if");
        this.currentWeather = {Key: '215854',
                      cityName: 'Tel Aviv',
                      temperature: weather[0].Temperature,
                      WeatherText: weather[0].WeatherText};
        // this.currentWeather = new_weather;
        console.log(this.currentWeather);
      }
      else{
        console.log("inside else");
        this.currentWeather = this.defaultWeather;
       }
       this.code = weather[0].WeatherIcon;
    });
    //get the five day forcast
    console.log(this.currentWeather)
    this.weatherService.getFiveDayForecast(this.currentWeather.Key,this.metric).subscribe((forecast:any) => {
      console.log(forecast);
      this.fiveDayForecast = forecast.DailyForecasts;
      console.log(this.fiveDayForecast);
    });
  }*/
  ngOnInit(): void {
    console.log(`WeatherPageComponent initialized`);
    // Tel Aviv code 215854
    this.weatherService.getCurrentWeather('215854').pipe(
      switchMap((weather: any) => {
        if (weather.length > 0) {
          // console.log("inside if");
          const new_weather = {
            Key: '215854',
            cityName: 'Tel Aviv',
            temperature: weather[0].Temperature,
            WeatherText: weather[0].WeatherText,
            weatherIcon: weather[0].WeatherIcon
          };
          this.currentWeather = new_weather;
          // console.log(this.currentWeather);
        } else {
          // console.log("inside else");
          this.currentWeather = this.defaultWeather;
        }
        this.code = weather[0].WeatherIcon;
        this.storageService.searchWeather(this.currentWeather.Key) ? this.isFavorite = true : this.isFavorite = false;
        // Once current weather is retrieved, fetch the five-day forecast
        return this.weatherService.getFiveDayForecast(this.currentWeather.Key, this.metric);
      })
    ).subscribe((forecast: any) => {
      this.fiveDayForecast = forecast.DailyForecasts;
    });
  }
  
   
  searchLocations(){  
    //if the queary is not empty and more then 3 chars were written for search such that the api
    //will not get called every char
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
        //create a new object with the weatehr structure
        new_weather = {Key: location.Key,
                      cityName: location.LocalizedName,
                      temperature: weather[0].Temperature,
                      WeatherText: weather[0].WeatherText,
                      weatherIcon: weather[0].WeatherIcon};
        // this.currentWeather = weather[0];
        this.currentWeather = new_weather;
        this.code = weather[0].WeatherIcon;
        // console.log(this.currentWeather.cityName);
        this.storageService.searchWeather(this.currentWeather.Key) ? this.isFavorite = true : this.isFavorite = false;
        //show the 5 day forcast
        this.weatherService.getFiveDayForecast(location.Key,this.metric).subscribe((forecast:any) => {
          this.fiveDayForecast = forecast.DailyForecasts;
        });
        //update the favorite button
        console.log(this.currentWeather.cityName+"\t"+this.currentWeather.Key)
        console.log("selected a new city" + this.isFavorite);
      }
    });
    this.searchResults = [];
    console.log(this.isFavorite);
  }

  getDayName(forecastDate: string):string {
    const date = new Date(forecastDate);

    // Get the day of the week as a number (0-6)
    const dayNumber = date.getDay();

    // Map the day number to its name
    const dayName = this.dayNames[dayNumber];

    return dayName;
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    
    // Get the current list of favorite weather items from local storage
    // const storedData = localStorage.getItem('favoriteWeatherList');
    // console.log("storedData: " + storedData)

    let favoriteWeatherList: weather[] = [];
    //initialize the list if it is empty
    this.storageService.getData() !== null ? favoriteWeatherList = this.storageService.getData() : favoriteWeatherList = [];
    if (this.isFavorite) {
      // Add the currentWeather object to the list of favorites
      console.log("isFavorite == True: "+this.currentWeather)
      this.storageService.addTofavorite(this.currentWeather);
      // favoriteWeatherList.push(this.currentWeather);
  
      // Limit the list to 5 favorite weather items
      if (favoriteWeatherList.length > 5) {
        favoriteWeatherList = favoriteWeatherList.slice(favoriteWeatherList.length-5, favoriteWeatherList.length);
      }
    } else {
      // Remove the currentWeather object from the list of favorites
      console.log("else")
      this.storageService.removeFromFavorite(this.currentWeather);
      // favoriteWeatherList = favoriteWeatherList.filter((item) => item.Key !== this.currentWeather.Key);
    }
  
    // Save the updated list of favorite weather items in local storage
    console.log("set new item" + JSON.stringify(favoriteWeatherList))
    // localStorage.setItem('favoriteWeatherList', JSON.stringify(favoriteWeatherList));
    }
}