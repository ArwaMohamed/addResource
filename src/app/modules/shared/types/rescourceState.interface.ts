import { IResource } from "./rescource";

export interface IResourceState{
  isloading:boolean;
  resource:IResource | null;
  error:string | null;
}
