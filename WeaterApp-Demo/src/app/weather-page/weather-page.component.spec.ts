import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherPageComponent } from './weather-page.component';

describe('WeatherPageComponent', () => {
  let component: WeatherPageComponent;
  let fixture: ComponentFixture<WeatherPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherPageComponent]
    });
    fixture = TestBed.createComponent(WeatherPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
