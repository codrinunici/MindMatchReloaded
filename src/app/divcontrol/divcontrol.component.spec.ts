import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivcontrolComponent } from './divcontrol.component';

describe('DivcontrolComponent', () => {
  let component: DivcontrolComponent;
  let fixture: ComponentFixture<DivcontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivcontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivcontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
