import { Component } from '@angular/core';
import { AppStateInterface } from '../home/appStateInterface';
import { Store, select } from '@ngrx/store';
import * as ResourceAction from '../shared/store/action';
import { selectAllData } from '../shared/store/selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  added$
  stateData:any
 toggleNgModel = true
constructor(private store: Store<AppStateInterface>,){
  this.added$ = this.store.pipe(select(selectAllData));
  this.added$.subscribe((res)=>{
 if(res['resource']?.resource){
  this.stateData = res['resource'].resource

 }
  })
}
save(){
  let data =this.store.dispatch(ResourceAction.getResource())
  this.displayData(this.stateData)
}
 displayData(data: any) {
   let formattedData = `Name: ${data?.name}\n`;
   formattedData += `Available: ${data?.availavle}\n`;
   formattedData += `Booking Counter: ${data?.booking_counter}\n`;
   // formattedData += `Picture: ${data?.picture}\n`;
   formattedData += 'Schedule:\n';
   for (const day of data?.schedule) {
    const start = day.startTime;
    const end = day.endTime;
    const startTime = new Date(start);
    const endTime = new Date(end);
    const timeStartString = startTime.toLocaleTimeString().replace(/:\d{2}\s/, ' ');
    const timeEndString = endTime.toLocaleTimeString().replace(/:\d{2}\s/, ' ');
    formattedData += `${day.nama}:\n`;
    formattedData += `Start Time: ${timeStartString} End Time: ${timeEndString}\n`;

  }

  alert(formattedData);
}

}
