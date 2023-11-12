import { Component, EventEmitter, Output } from '@angular/core';
import { PageStateService } from '../services/page-state.service';

@Component({
  selector: 'app-header-weather',
  templateUrl: './header-weather.component.html',
  styleUrls: ['./header-weather.component.css']
})
export class HeaderWeatherComponent {
  constructor(private pageStateService: PageStateService) { }

  navigateToWeatherPage() {
    this.pageStateService.setCurrentPage('weather');
  }
  navigateToFavoritesPage() {
    this.pageStateService.setCurrentPage('favorites');
  }
  setMetric(){
    this.pageStateService.setMetric(true);
  }
  clearMetric(){
    this.pageStateService.setMetric(false);
  }
  getIsMetric(){
    return this.pageStateService.getIsMetric().getValue();
  }
}
