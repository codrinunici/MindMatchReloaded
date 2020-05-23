import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {UserService} from '../_services/user.service';
import {PassDataService} from '../_services/pass-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register-questions.component.html'
})

export class RegisterQuestionsComponent implements OnInit {
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
  public sentUsername: string;
  public sentPass: string;


  constructor(private fb: FormBuilder, private router: Router,
              private userService: UserService, private credentialSender: PassDataService) {
    let i: number;
    for (i = 0; i < this.personalQuestions.length; ++i) {
      this.personalQuestionnaireGroup[i] = this.fb.group({
        question: this.personalQuestions[i],
        answers: this.mapPossibleAnswersPersQues()
      });
    }
  }

  ngOnInit(): void {
    this.credentialSender.currentUsername.subscribe(user => this.sentUsername = user);
    this.credentialSender.currentPass.subscribe(pass => this.sentPass = pass);
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
            console.log(index + ' ' + i);
            this.personalQuestionnaireGroup[index].value['answers'][i] = 0;
            this.finalResponse[index] = this.possibleAnswersPersQues[i];
          }
        }
      }
    );
    console.log(this.finalResponse);
  }


  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.userService.register({username: this.sentUsername, password: this.sentPass, response: this.finalResponse})
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/login'], {queryParams: {registered: true}});
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }


}
