import { createReducer, on } from "@ngrx/store";
import { IResourceState } from "../types/rescourceState.interface";
import * as ResourceAcion from './action'
export const initialState: IResourceState ={
  isloading:false,
  resource:null,
  error:null
}

export const reducers = createReducer(initialState,on(ResourceAcion.getResource,(state)=>({
  ...state,isloading:true
})))



export const userReducer = createReducer(
  initialState,
  on(ResourceAcion.getResource, state => ({ ...state, isloading: true })),
  on(ResourceAcion.addResourceSuccess, (state, { Resource }) => ({
    ...state,
    loading: false,
    resource: Resource
  })),
);
