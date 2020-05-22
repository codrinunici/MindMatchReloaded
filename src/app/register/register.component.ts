import {Component, OnChanges, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})

export class RegisterComponent {
  private tempResponseBuilder = [];
  private finalResponse: string[] = [];
  showTheQuestionnaire = false;
  personalQuestions = [
    'question1',
    'question2',
    'question3',
    'question4',
    'question4',
    'question5'
  ];

  wouldYouRatherQuestions = [
    'wyr1',
    'wyr2',
    'wyr3',
    'wyr4',
    'wyr5',
    'wyr6',
    'wyr7',
  ];
  possibleAnswersPersQues = ['A', 'B', 'C', 'D'];
  public personalQuestionnaireGroup: FormGroup[] = Array(this.personalQuestions.length);
  private oneAnswerPerQuestion: string[] = Array();
  public submitted = false;
  public loading = false;
  public error = false;
  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    let i: number;
    for (i = 0; i < this.personalQuestions.length; ++i) {
      this.personalQuestionnaireGroup[i] = this.fb.group({
        question: this.personalQuestions[i],
        answers: this.mapPossibleAnswersPersQues()
      });
    }
  }
  mapPossibleAnswersPersQues() {
    const answerArr = this.possibleAnswersPersQues.map(answer => {
      return this.fb.control(0);
    });
    return this.fb.array(answerArr);
  }

  getAnswersArrayAtIndex(index: number) {
    return this.personalQuestionnaireGroup[index].get('answers') as FormArray;
  }

  getSelectedAnswers(index: number) {
    this.getAnswersArrayAtIndex(index).controls.forEach((control, i) => {
        const questionAnsweredAlready = this.oneAnswerPerQuestion.indexOf(this.personalQuestions[index]);
        this.tempResponseBuilder.push(i);
        if (control.value) {
          if (questionAnsweredAlready === -1) {
            this.oneAnswerPerQuestion.push(this.personalQuestions[index]);
            this.finalResponse.push(this.possibleAnswersPersQues[i]);
          } else {
            // gotta uncheck old answer. if I do that, it's gonna work.
            this.finalResponse[index] = this.possibleAnswersPersQues[i];
          }
        }
      }
    );
    console.log(this.finalResponse);
  }


  // onSubmit() {
  //   this.submitted = true;
  //
  //   // stop here if form is invalid
  //   this.loading = true;
  //   this.userService.register(this.finalResponse)
  //     .pipe(first())
  //     .subscribe(
  //       data => {
  //         this.router.navigate(['/login'], {queryParams: {registered: true}});
  //       },
  //       error => {
  //         this.error = error;
  //         this.loading = false;
  //       });
  // }

}
