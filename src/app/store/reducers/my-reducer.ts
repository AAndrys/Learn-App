import { createReducer, on } from '@ngrx/store';
import * as MyActions from '../actions/my-actions';

export interface MyState {
  text: string;
}

export const initialState: MyState = {
  text: 'Initial data',
};

const myReducer = createReducer(
  initialState,
  on(MyActions.updateData, (state, newState) => ({
    ...state,
    ...newState,
  }))
);

export function reducer(state: any, action: any) {
  return myReducer(state, action);
}
