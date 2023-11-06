import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherPageComponent } from './weather-page/weather-page.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';

  const routes: Routes = [
    {
      path: '',
      children: [
        { path: 'weather', component: WeatherPageComponent },
        { path: 'favorites', component: FavoritesPageComponent },
      ],
    },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
