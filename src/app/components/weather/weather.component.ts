import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})


export class WeatherComponent {
  query: string;
  weather: any;
  api = {
    apiKey: 'eaaa9a43128047890f13cb72e3b68ddf',
    base: "https://api.openweathermap.org/data/2.5/"
  }


  constructor(private http: HttpClient) {
    this.query = '';
    this.weather = {};
  }

  search(): void {
    this.http.get<any>(`${this.api.base}weather?q=${this.query}&units=metric&APPID=${this.api.apiKey}`).subscribe(data => {
      this.weather = data;
    })
  }

  dateBuilder(): string {
    const today = new Date()
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[today.getDay()];
    let date = today.getDate();
    let month = months[today.getMonth()];
    let year = today.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  isUndefined(value: any): boolean {
    return typeof value.main != "undefined"
  }

  roundTemp(value: any): string {
    return `${Math.round(value.main.temp)} °c`
  }
}
