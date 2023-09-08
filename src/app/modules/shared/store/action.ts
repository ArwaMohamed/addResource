import { createAction, props } from "@ngrx/store";
import { IResourceState } from "../types/rescourceState.interface";
import { IResource } from "../types/rescource";

export const getResource = createAction('[Resource] Get Resource')

export const storeResource = createAction('[Resource] Create Resource')
export const addResource = createAction(
  '[Resource] Create Resource',
  props<{ Resource: IResource }>()
);

export const addResourceSuccess = createAction(
  '[Resource] Create Resource Success',
  props<{ Resource: IResource }>()
);

