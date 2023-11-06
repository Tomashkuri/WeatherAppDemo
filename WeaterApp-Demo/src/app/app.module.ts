import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherPageComponent } from './weather-page/weather-page.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { HeaderWeatherComponent } from './header-weather/header-weather.component';
import { ToolbarModule} from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { FormsModule } from '@angular/forms';
import { PageSwitcherComponent } from './page-switcher/page-switcher.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherPageComponent,
    FavoritesPageComponent,
    HeaderWeatherComponent,
    PageSwitcherComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
