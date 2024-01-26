import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { ThreeComponent } from './three/three.component';
import { PaintComponent } from './paint/paint.component';
import { HomeComponent } from './home/home.component';
import { StateTestComponent } from './state-test/state-test.component';
import { ThreePulseComponent } from './three-pulse/three-pulse.component';

export enum PathsEnums {
  home,
  todo,
  paint,
  three,
  state,
  pulse,
}

export type PathsTypes = { [key in PathsEnums]?: string };

const paths: PathsTypes = {
  [PathsEnums.home]: '',
  [PathsEnums.todo]: 'todo',
  [PathsEnums.paint]: 'paint',
  [PathsEnums.three]: 'three',
  [PathsEnums.state]: 'state',
  [PathsEnums.pulse]: 'three-pulse',
};

const routes: Routes = [
  { path: paths[PathsEnums.home], component: HomeComponent },
  { path: paths[PathsEnums.todo], component: TodoComponent },
  { path: paths[PathsEnums.paint], component: PaintComponent },
  { path: paths[PathsEnums.three], component: ThreeComponent },
  { path: paths[PathsEnums.state], component: StateTestComponent },
  { path: paths[PathsEnums.pulse], component: ThreePulseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
