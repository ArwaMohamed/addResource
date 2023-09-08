import { Time } from "@angular/common";
import { ISchedule } from "./scedule";
import { Day } from "../../scedule/scedule.component";

export interface IResource{
  name?:string;
  picture?:string;
  type?:string;
  availavle?:string;
  resource_time?:number;
  booking_type?:string;
  booking_counter?:number;
  schedule?:any[];
}
