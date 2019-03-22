import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  geolocationPosition;
  userCity: string = "";
  today = new Date();
  userWeather;
  tempinC;
  badWeather;
  tempMin: string = '';
  tempMax: string = '';


  constructor(private service: WeatherService) { }

  ngOnInit() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.geolocationPosition = position;
          this.geolocationPosition.latitude = position.coords.latitude;
          this.geolocationPosition.longitude = position.coords.longitude;
          this.getLocation();
        },
        error => {
          switch (error.code) {
            case 1:
              console.log('Permission Denied');
              break;
            case 2:
              console.log('Position Unavailable');
              break;
            case 3:
              console.log('Timeout');
              break;
          }
        }
      );
    };

    //this.getLocation();
  }

  getLocation() {
    this.service.ipLookUp()
      .subscribe(location => {
        this.userCity = location.city;
        console.log(this.userCity)
        const roundlat = (this.geolocationPosition.latitude).toFixed(0);
        const roundlog = (this.geolocationPosition.longitude).toFixed(0);
        this.getWeatherByLocation(roundlat.toString(), roundlog.toString());
      })

  }

  getWeatherByLocation(lat, lon) {
    this.service.getWeatherByLocation(lat, lon)
      .subscribe(
        info => {
          this.userWeather = info;
          console.log(info)
          console.log(this.userWeather)
          this.tempinC = (this.userWeather.main.temp - 273).toFixed(0);
          this.tempMin = (this.userWeather.main.temp_min - 273).toFixed(0);
          this.tempMax = (this.userWeather.main.temp_max - 273).toFixed(0);

          if (this.userWeather.clouds.all >= 10) {
            console.log(22, this.userWeather.clouds.all);
            this.badWeather = true;
            console.log(1, this.badWeather)
          } else {
            this.badWeather = false;
          }
          console.log(2, this.badWeather)
        })
  }
}
