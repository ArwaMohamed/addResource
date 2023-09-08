import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NbTimePickerComponent, NbToastrService } from '@nebular/theme';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from '../home/appStateInterface';
import { isloadingSelector, addSelector, selectAllData } from '../shared/store/selectors';
import { IResource } from '../shared/types/rescource';
import * as ResourceAction from '../shared/store/action';
import { ISchedule } from '../shared/types/scedule';
import { Observable } from 'rxjs-compat';
import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr';
export interface Day {
  name: string;
  active: boolean;
  times: { startTime: string; endTime: string }[];
}

@Component({
  selector: 'app-scedule',
  templateUrl: './scedule.component.html',
  styleUrls: ['./scedule.component.scss'],
})
export class SceduleComponent
  implements OnInit,AfterContentChecked
{
  @ViewChild('timepicker1') timepicker1!: NbTimePickerComponent<any>;
  @ViewChild('timepicker2') timepicker2!: NbTimePickerComponent<any>;
  added$:Observable<any>
  days: Day[] = [
    { name: 'Sunday', active: false, times: [{ startTime: '', endTime: '' }] },
    { name: 'Monday', active: false, times: [{ startTime: '', endTime: '' }] },
    { name: 'Tuesday', active: false, times: [{ startTime: '', endTime: '' }] },
    {
      name: 'Wednesday',
      active: false,
      times: [{ startTime: '', endTime: '' }],
    },
    {
      name: 'Thursday',
      active: false,
      times: [{ startTime: '', endTime: '' }],
    },
    { name: 'Friday', active: false, times: [{ startTime: '', endTime: '' }] },
    {
      name: 'Saturday',
      active: false,
      times: [{ startTime: '', endTime: '' }],
    },
  ];
  array: any[] = []
  stateData:any
  delete:boolean=false
  constructor(private store: Store<AppStateInterface>, private toastr: NbToastrService) {
    this.added$ = this.store.pipe(select(selectAllData));
    this.added$.subscribe((res)=>{
      if(res['resource'].resource){
        !this.delete?this.toastr.success("Success",`The date entern successfuly`):this.toastr.warning("Warning",`You Delete a date From Your Schedule`)
        this.stateData = res['resource'].resource
      }
    })
  }
  ngAfterContentChecked() {
    if (this.timepicker1) {
      this.timepicker1.hoursText = 'ساعة';
      this.timepicker1.minutesText = 'دقائق';
    }
    if (this.timepicker2) {
      this.timepicker2.hoursText = 'ساعة';
      this.timepicker2.minutesText = 'دقائق';
    }
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  toggleDay(day: Day): void {
    day.active = !day.active;
  }

  addTime(day: Day,index:number): void {
    this.delete = false;
    this.formateData(day,day.times.length-1)
    day.times.push({ startTime: '', endTime: '' });
  }

  removeTime(day: Day, index: number): void {
    this.delete=true
    let data
    let newArray:any =[]
    day.times.splice(index, 1);
    day.times.forEach((time)=>{
       data = {
        nama:day.name,
        startTime:time.startTime,
        endTime:time.endTime,
      }
      newArray.push(data)
    })
   this.array = newArray
   this.storeData()
  }
  formateData(day:Day,index:number){
    let data = {
      nama:day.name,
      startTime:day.times[index].startTime,
      endTime:day.times[index].endTime,
    }
    this.array.push(data)
    this.storeData(data)
  }
  storeData(data?:any) {
    let arrayCopy = [...this.array];
   data? arrayCopy.push(data): arrayCopy = [...this.array]
    let Resource: IResource = {
      ...this.stateData,
      schedule :arrayCopy
    };
    this.store.dispatch(ResourceAction.addResourceSuccess({ Resource }));
  }
}
