import { Component, EventEmitter, Output } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Brand } from 'src/app/models/brand-model';
import { FormControl, FormGroup } from '@angular/forms';
import { Profile } from 'src/app/models/profile-model';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.scss']
})
export class ListContainerComponent {

  brands!: Brand[];
  profiles: Profile[] = []; //of current selected brand

  posts: any[] = [];

  currentProfileType: any;
  currentBrandName: any;

  chosenBrand!: Brand;

  dates = 0;

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

  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    console.log(dateRangeStart.value);
    console.log(dateRangeEnd.value);
    if (this.chosenBrand &&
      dateRangeStart.value &&
      dateRangeEnd.value) {
        this.onSubmit();
        this.dates ++; 
      }
  }
  onBrandSelected(brand: any) {
    this.chosenBrand = brand.value;
    let brandName = brand.value.brandname;
    this.currentBrandName = brandName;
    if (this.chosenBrand && 
      this.optionForm.value.dateStart && 
      this.optionForm.value.dateEnd) this.onSubmit();
  }

  onSubmit() {
    console.log(this.optionForm.value.brandName)
    console.log(this.optionForm.value.dateStart, 
      this.optionForm.value.dateEnd)
  
    this.getPosts();
  }

//----

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
      "profiles": this.chosenBrand.profiles,
      "start": dayjs(this.optionForm.value.dateStart).valueOf(),
      "end": dayjs(this.optionForm.value.dateEnd).valueOf()
    };
    console.log(requestBody);

    this.api.getPostsInBrand(requestBody).subscribe({
      next: (res) => {
        this.posts = res;
        console.log(res)
        console.log(this.chosenBrand.profiles)

      },
      error: (e) => console.log(e)
    })
  };

}
