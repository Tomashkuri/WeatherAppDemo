export class weather{
    Key: string;
    cityName: string;
    temperature: Temperature;
    WeatherText: string;
    WeatherIcon: number;
}
export interface tempvalue{
    value: number,
    unit: string,
    UnitType: number
  }
export interface Temperature{
    Metric: tempvalue,
    Imperial: tempvalue
}