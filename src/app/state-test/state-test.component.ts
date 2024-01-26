import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { updateData } from '../store/actions/my-actions';
import { MyState } from '../store/reducers/my-reducer';
import { dataSelector } from '../store/selectors/my-selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-state-test',
  templateUrl: './state-test.component.html',
  styleUrls: ['./state-test.component.scss'],
})
export class StateTestComponent {
  test$: Observable<string>;
  testData: string | undefined;

  constructor(private store: Store<{ myState: MyState }>) {
    this.test$ = this.store.pipe(select(dataSelector));
  }

  async ngOnInit() {
    this.test$.subscribe((data) => {
      this.testData = data;
    });
  }

  updateData(newData: string) {
    this.store.dispatch(
      updateData({
        text: this.testData?.includes('Nanana') ? newData : 'Nanana',
      })
    );
  }
}
