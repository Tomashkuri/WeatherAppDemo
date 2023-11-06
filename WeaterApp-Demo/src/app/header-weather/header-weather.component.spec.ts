import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderWeatherComponent } from './header-weather.component';

describe('HeaderWeatherComponent', () => {
  let component: HeaderWeatherComponent;
  let fixture: ComponentFixture<HeaderWeatherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderWeatherComponent]
    });
    fixture = TestBed.createComponent(HeaderWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
