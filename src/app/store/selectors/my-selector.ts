import { createSelector } from '@ngrx/store';
import { MyState } from '../reducers/my-reducer';

export interface FeatureState {
  myStore: MyState;
}

export const selectFeatureData = (state: any) => state.myState;

export const dataSelector = createSelector(
  selectFeatureData,
  (state: any) => state.text
);
