import { createAction, props } from '@ngrx/store';
import { MyState } from '../reducers/my-reducer';

export const updateData = createAction(
  '[My State] Update Data',
  props<MyState>()
);
