import { Component, Input } from '@angular/core';
import { PageStateService } from '../services/page-state.service';

@Component({
  selector: 'app-page-switcher',
  templateUrl: './page-switcher.component.html',
  styleUrls: ['./page-switcher.component.css']
})
export class PageSwitcherComponent {
  @Input() isMetric: boolean;
  constructor(private pageStateService: PageStateService) { }

  isWeatherPage() :boolean{
    return this.pageStateService.getCurrentPage() === 'weather';
  }
  
}