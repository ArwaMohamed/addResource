import { Component, OnInit } from '@angular/core';
import { NbComponentStatus } from '@nebular/theme';
import { Store, select } from '@ngrx/store';
import * as ResourceAction from '../shared/store/action';
import { addSelector, isloadingSelector } from '../shared/store/selectors';
import { AppStateInterface } from '../home/appStateInterface';
import { Observable } from 'rxjs';
import { IResourceState } from '../shared/types/rescourceState.interface';
import { IResource } from '../shared/types/rescource';
import { formatDate } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { EventService } from '../service/event.service';
@Component({
  selector: 'app-resource-info',
  templateUrl: './resource-info.component.html',
  styleUrls: ['./resource-info.component.scss'],
})
export class ResourceInfoComponent implements OnInit {
  user_photo: any = 'assets/images/Unknown_person.jpg'; //unknown avatar
  selectedItem: any | undefined;
  timing_value: string | undefined;
  booking_value: string | undefined;
  type_value: string | undefined;
  resource_name: string | undefined;
  day: any;
  isLoading$!: Observable<boolean>;
  added$!: any;
  full_date: string | undefined;
  resource_time: any = 0;
  time = 0;
  booking_value_count = 0;
  months = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 },
  ];
  options = [
    { value: 'one', label: 'Book during the day', checked: true },
    { value: 'multi', label: 'Book for a period (more than a day)' },
  ];
  timing = [
    { value: 'fixed', label: 'Fixed', checked: true },
    { value: 'clock', label: 'Clock' },
  ];
  persons = [
    { value: 'person', label: 'book one', checked: true },
    { value: 'group', label: 'book more' },
  ];
  statuses: NbComponentStatus[] = [
    'basic',
    'primary',
    'success',
    'warning',
    'danger',
    'info',
    'control',
  ];
lang:any
resource_name_trans = "resource name"
  constructor(private store: Store<AppStateInterface>,private translateServie:TranslateService, private eventsService:EventService) {
    this.isLoading$ = this.store.pipe(select(isloadingSelector));
    this.added$ = this.store.pipe(select(addSelector));
    this.lang= this.translateServie.currentLang
    this.eventsService.changeLangObser.subscribe((res) => {
    this.translateServie.get(this.resource_name_trans).subscribe((res)=>{
      this.resource_name_trans = res
    })
    })

  }
  ngOnInit(): void {
    this.store.dispatch(ResourceAction.getResource());
  }
  storeData() {
    let Resource: IResource = {
      name: this.resource_name,
      picture: this.user_photo,
      type: this.type_value,
      availavle: this.full_date,
      resource_time: this.time,
      booking_counter: this.booking_value_count,
    };
    this.store.dispatch(ResourceAction.addResourceSuccess({ Resource }));

  }
  getImage(file: any) {
    const reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = () => {
      this.user_photo = <string>reader.result;
    };
  }
  getTimingValue(event: string) {
    this.timing_value = event;
    this.time = this.timing_value == 'clock' ? 60 : 0;
  }
  getBookValue(event: string) {
    this.booking_value = event;
    this.booking_value_count = this.booking_value == 'one' ? 1 : 0;
  }
  getResourceType(event: string) {
    this.type_value = event;
  }
  getDate(event: any) {
    this.selectedItem = event;
    const currentYear = new Date().getFullYear();
    const mydate = new Date(currentYear, this.selectedItem, this.day);
    this.full_date = formatDate(mydate, 'yyyy-MM-dd', 'en');
    console.log(this.full_date);

  }

  counterTime(action: string) {
    if (this.time >= 0) {
      if (action == 'minus') {
        this.time--;
      } else {
        this.time++;
      }
    }
    this.resource_time = this.time + 'Min';
  }
  counterbooking(action: string) {
    if (this.booking_value_count >= 0) {
      if (action == 'minus') {
        this.booking_value_count--;
      } else {
        this.booking_value_count++;
      }
    }
  }
  save(){
    this.storeData();

  }
}
