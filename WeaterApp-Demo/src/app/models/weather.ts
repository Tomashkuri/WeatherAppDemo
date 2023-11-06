export interface weather{
    Key: string;
    cityName: string;
    temperature: Temperature;

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