import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserAndPassComponent } from './register-user-and-pass.component';

describe('RegisteruserandpassComponent', () => {
  let component: RegisterUserAndPassComponent;
  let fixture: ComponentFixture<RegisterUserAndPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterUserAndPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUserAndPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
