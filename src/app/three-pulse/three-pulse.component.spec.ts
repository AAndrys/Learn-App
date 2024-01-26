import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreePulseComponent } from './three-pulse.component';

describe('ThreePulseComponent', () => {
  let component: ThreePulseComponent;
  let fixture: ComponentFixture<ThreePulseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThreePulseComponent]
    });
    fixture = TestBed.createComponent(ThreePulseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
