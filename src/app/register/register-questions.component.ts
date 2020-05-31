import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {UserService} from '../_services/user.service';
import {PassDataService} from '../_services/pass-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register-questions.component.html'
})

export class RegisterQuestionsComponent {
  private tempResponseBuilder = [];
  private finalResponse: string[] = [];
  showTheQuestionnaire = false;
  public personalQuestionnaireGroup: FormGroup[] = Array();
  public submitted = false;
  public loading = false;
  public error = false;
  public answers = '';
  public structuredAnswers = [];
  public structuredQuestions = [];
  public questionnaire: any = [{}];
  private possibleAnswers = ['A', 'B', 'C'];
  private oneAnswerPerQuestion: string[] = [];
  public invalidForm = false;
  private receivedId = '';

  constructor(private fb: FormBuilder, private router: Router,
              private userService: UserService, private credentialSender: PassDataService) {
    this.userService.getQandA().then(res => this.setQnA(res));
    this.credentialSender.currentId.subscribe(id => this.receivedId = id);
  }

  setQnA(res) {
    this.questionnaire = res;
  }

  buildForm() {

    let i: number;
    for (i = 0; i < this.questionnaire.length; ++i) {
      this.personalQuestionnaireGroup[i] = this.fb.group({
        question: this.questionnaire[i]['question'],
        answers: this.mapPossibleAnswersPersQues(this.questionnaire[i])
      });
    }
  }

  mapPossibleAnswersPersQues(answers: {}) {
    const thisQuestionsAnswers = [''];
    for (const key in answers) {
      if (key.startsWith('asnwer')) {
        thisQuestionsAnswers.push(answers[key]);
      }
    }
    this.structuredQuestions.push(answers['question']);
    this.structuredAnswers.push(thisQuestionsAnswers);
    thisQuestionsAnswers.shift();
    const answerArr = thisQuestionsAnswers.map(answer => {
      return this.fb.control(0);
    });
    return this.fb.array(answerArr);
  }

  getAnswersArrayAtIndex(index: number) {
    return this.personalQuestionnaireGroup[index].get('answers') as FormArray;
  }


  getSelectedAnswers(index: number) {
    this.getAnswersArrayAtIndex(index).controls.forEach((control, i) => {
        const questionAnsweredAlready = this.oneAnswerPerQuestion.indexOf(this.structuredQuestions[index]);
        this.tempResponseBuilder.push(i);
        if (control.value) {
          if (questionAnsweredAlready === -1) {
            this.oneAnswerPerQuestion.push(this.structuredQuestions[index]);
            this.finalResponse.push(this.possibleAnswers[i]);
          } else {
            this.personalQuestionnaireGroup[index].value['answers'][i] = 0;
            this.finalResponse[index] = this.possibleAnswers[i];
          }
        }
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.finalResponse.map(singleAnswer => this.answers += singleAnswer);
    if (this.finalResponse.length !== this.questionnaire.length) {
      this.invalidForm = true;
      return;
    }
    this.userService.registerAnswers({userid: this.receivedId, cnp: this.answers}) // user id will come from backend
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
