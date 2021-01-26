import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { AppServicesService } from '../../app-services.service';
import { Crop, Stage } from '../../models/Crop';
import { CropDataService } from 'src/app/service/CropDataService';

@Component({
  selector: 'app-growth-stage',
  templateUrl: './growth-stage.component.html',
  styleUrls: ['./growth-stage.component.scss'],
})

export class GrowthStageComponent implements OnInit {
  crop: Crop;
  stages: Stage[];

  constructor(
    private router: Router,
    private location: Location,
    private appService: AppServicesService,
    private route: ActivatedRoute,
    private cropService: CropDataService
  ) {}

  ngOnInit(): void {
    // TODO find the correct id or figure out a way to get the crop
    console.log('select crop growth satge init: ', this.route.snapshot.paramMap.get('id'));
    const cropId = this.route.snapshot.paramMap.get('id');
    this.cropService.getCropData(cropId).subscribe((cropData) => {
      console.log('crop data: ', cropData);
      this.cropService.storeSelectedCropInSession(cropData);
      this.crop = cropData;
      this.stages = cropData.cropGrowthStage.stages;
      
    });
    /*this.appService.requestCropsInfo(this.route.snapshot.paramMap.get('id')).subscribe(cropInfoResponse => {
      this.crop = cropInfoResponse.data;
      this.stages = cropInfoResponse.data.cropGrowthStage.stages;
    });*/
  }

  public volumeClicked() {

  }

  public backClicked() {
    this.location.back();
  }

  cardClicked(stage: Stage) {
    this.router.navigateByUrl('/my-crops');
  }
}