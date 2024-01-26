import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { reducer } from './store/reducers/my-reducer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { PaintComponent } from './paint/paint.component';
import { ThreeComponent } from './three/three.component';
import { HomeComponent } from './home/home.component';
import { StateTestComponent } from './state-test/state-test.component';
import { ThreePulseComponent } from './three-pulse/three-pulse.component';

const stores = { myState: reducer };

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    PaintComponent,
    ThreeComponent,
    HomeComponent,
    StateTestComponent,
    ThreePulseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot(stores),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
