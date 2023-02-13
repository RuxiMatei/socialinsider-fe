import { Component, EventEmitter, Output } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Brand } from 'src/app/models/brand-model';
import { Post } from 'src/app/models/post-model';
import { ProfileType } from 'src/app/models/profile-types';
import { FormControl, FormGroup } from '@angular/forms';
import { Profile } from 'src/app/models/profile-model';
import * as dayjs from 'dayjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.scss']
})
export class ListContainerComponent {

  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    console.log(dateRangeStart.value);
    console.log(dateRangeEnd.value);
    this.onSubmit();
  }

  brands!: Brand[];
  profiles: Profile[] = []; //of current selected brand

  posts: Post[] = [];
  currentProfileType: any;
  currentBrand: any;

  chosenBrand!: string;
  chosenProfile!: any;

  profileDisplayNames: string[] = [];

  optionForm = new FormGroup ({
    brandName: new FormControl(''),
    profile: new FormControl(''), //choose profile for which to display posts
    dateStart:new FormControl(''),
    dateEnd: new FormControl('')
  });

  constructor(private api: ApiServiceService) {}

  ngOnInit() {
    this.getBrands();
  }

  onBrandSelected(brand: any) {
    this.chosenBrand = brand.value;
    let brandName = brand.value.brandname;
    this.currentBrand = brandName;
    console.log(this.currentBrand, "HEREEEEEE")
    
    this.profileDisplayNames = [];
    this.profiles = [];

    let brandObject = this.brands.find(brand => brand.brandname === brandName);
    this.getProfileDisplayType(brandObject)
    console.log(this.profileDisplayNames, this.profiles);
  }
  getProfileDisplayType(brand: Brand | undefined): void {
    brand?.profiles.forEach((profil: any) => {
      this.profiles.push(profil);
      this.profileDisplayNames.push(profil.profile_type.substring(0, profil.profile_type.indexOf("_"))); 
    })
  }

  // addDates(dates: any): void {
  //   console.log("HERE", dates)
  //   this.dateStart = dates[0];
  //   this.dateEnd = dates[1];
  // }


  onSubmit() {
    console.log(this.optionForm.value.brandName)
    console.log(this.optionForm.value.profile)
    this.chosenProfile = this.optionForm.value.profile
    console.log(this.optionForm.value.dateStart, 
      this.optionForm.value.dateEnd)
  
      this.getPosts();
  }



  getBrands(): void {
    this.api.getBrandsInProject().subscribe({
      next: (res: any) => {
        this.brands = res.message.result;
      },
      error: (e) => console.log(e)
    })
  };

  getPosts(): void {
    const requestBody = {
      "id": this.chosenProfile.id,
      "profile_type": this.chosenProfile.profile_type,
      "start": dayjs(this.optionForm.value.dateStart).valueOf(),
      "end": dayjs(this.optionForm.value.dateEnd).valueOf(),
      "timezone": "Europe/London"
    };
    console.log(requestBody);

    this.api.getPostsInBrand(requestBody).subscribe({
      next: (res) => {
        console.log(res);
        this.currentProfileType = this.chosenProfile.profile_type.substring(0, this.chosenProfile.profile_type.indexOf("_")),
        this.posts = res.message.resp.posts;
      },
      error: (e) => console.log(e)
    })
  };

}
