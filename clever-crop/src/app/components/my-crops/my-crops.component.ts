import { Component, OnInit, Input } from '@angular/core';
import { formatDate, Location } from '@angular/common';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ThemePalette } from '@angular/material/core';

import { AppServicesService } from '../../app-services.service';
import { CropListResponse } from '../../models/api/CropListResponse';
import { CropInfoResponse } from '../../models/api/CropInfoResponse';
import { Crop } from '../../models/Crop';
import { DataService } from '../../service/DataService';
import { WeatherResponse } from 'src/app/models/api/WeatherResponse';
import { WeatherDataService } from 'src/app/service/WeatherDataService';
import { Today } from 'src/app/models/Today';

@Component({
  selector: 'app-my-crops',
  templateUrl: './my-crops.component.html',
  styleUrls: ['./my-crops.component.scss'],
})
export class MyCropsComponent implements OnInit {
  dataSource: Crop[];
  displayedColumns: string[] = ['EmptyColumnTitle'];

  tabs = ['My Crops', 'Settings'];
  activeTab = this.tabs[0];
  background: ThemePalette = undefined;

  currentDate = '';

  constructor(private appService: AppServicesService, private router: Router, private location: Location,
              private weatherService: WeatherDataService) { }

  ngOnInit(): void {
    this.appService.getMyCrops().subscribe(cropListResponse => {
      this.dataSource = cropListResponse.data;
    });
    this.currentDate =  formatDate(new Date(), 'MMMM d, yyyy', 'en');

    /*this.dataService.getWeatherInfo().subscribe((weatherInfo: WeatherResponse) => {
      //console.log('weather data: ', weatherInfo);
      const todayWeather = WeatherService.getInstance().createTodayWeather(weatherInfo);
      console.log('today weather: ', todayWeather);
    });*/

    this.weatherService.getTodayWeather().subscribe((todayWeather: Today) => {
      console.log('today weather: ', todayWeather);
    });
  }

  public tabClicked(tab) {
    this.activeTab = tab;
    if (tab === tab[0]) {
      this.router.navigateByUrl('/my-crops');
    } else {
      this.router.navigateByUrl('/settings');
    }
  }

  public fabClicked() {
    this.router.navigateByUrl('/select-crop');
  }

  public volumeClicked() {

  }

  public cropClicked(event){
    this.router.navigate(['/water-advice/:1']);
  }

  public backClicked() {
    this.location.back();
  }
}