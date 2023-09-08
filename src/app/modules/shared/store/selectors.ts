import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "../../home/appStateInterface";

export const selectFeature =  (state : AppStateInterface) =>state.resource

export const isloadingSelector = createSelector(
  selectFeature,
  (state)=>state.isloading
)
export const addSelector = createSelector(
  selectFeature,
  (state)=>state
)
export const selectAppState = (state: AppStateInterface) => state;

export const selectAllData = createSelector(
  selectAppState,
  (state: AppStateInterface) => state,
);
