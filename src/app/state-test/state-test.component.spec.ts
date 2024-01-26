import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateTestComponent } from './state-test.component';

describe('StateTestComponent', () => {
  let component: StateTestComponent;
  let fixture: ComponentFixture<StateTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StateTestComponent]
    });
    fixture = TestBed.createComponent(StateTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
