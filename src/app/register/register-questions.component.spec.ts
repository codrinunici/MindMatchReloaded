import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterQuestionsComponent } from './register-questions.component';

describe('RegisterComponent', () => {
  let component: RegisterQuestionsComponent;
  let fixture: ComponentFixture<RegisterQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
