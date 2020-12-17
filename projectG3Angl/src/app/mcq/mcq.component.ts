import { Component, OnInit } from '@angular/core';
import { Mcq } from './mcq';
import { ActivatedRoute, Router } from '@angular/router';
import { McqService } from 'src/app/mcq.service';
import { AddtoFavService } from '../addto-fav.service';
import { Addfav } from '../addfav';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
// import { Score } from './score.model';
import { Subscription, TimeInterval, timer } from 'rxjs';
import { Time } from '@angular/common';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-mcq',
  templateUrl: './mcq.component.html',
  styleUrls: ['./mcq.component.scss'],
})
export class McqComponent implements OnInit {
  hr: number = 0;
  min: number = 0;
  sec: number = 0;
  interval: any;
  timer: any;
  remainingTime: any = [];
  // countDown: Subscription = new Subscription();
  // counter:
  // Time = {
  //   hours: 0,
  //   minutes: 30,
  // };
  userName: any;
  tick = 1000;
  qidid: any;
  ques: any = [];
  mydata: any;
  favData: any;
  uid: number = 2;
  qid: number = 1;
  que: any = [];
  selected: boolean = false;
  correctans: boolean = false;
  checkAns: boolean = false;
  questionobj: any;
  desc: any;
  maxScorer: any;
  score: number = 0;

  constructor(
    public service: McqService,
    private myserv: AddtoFavService,
    private serv: Addfav,
    private router: Router
  ) {
    this.service.getStatusList(this.uid, this.qid).subscribe((res: any) => {
      this.mydata = res;
      console.log(this.mydata, 'This is status');
      for (let i = 0; i < this.mydata.length; i++) {
        if (i == this.mydata.length - 1) {
          console.log(this.mydata[i].remainingtime);
          this.timer = this.mydata[i].remainingtime;
        }
      }
    });

    //favourite
    this.myserv.getFavList(this.uid, this.qid).subscribe((res: any) => {
      this.favData = res;
      console.log('data', this.favData);
      this.selected = this.serv.getList(this.favData);
    });
    //High score
    this.service.getScore(this.qid).subscribe(
      (data: any) => {
        this.maxScorer = data.maxscore;
        this.userName = data.usersc.username;
        console.log('high score', data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    // this.countDown = timer(0, this.tick).subscribe(() => --this.counter);
    // throw new Error('Method not implemented.');
  }
  fav = {
    "quizid": this.qid,
    "userid": this.uid,
    "status": true,
  };
  toggleSelected(): void {
    this.selected = this.serv.favToggel(this.fav);
  }
  setTimer(functime: any) {
    //alert("in funct");
    // debugger;
    this.timer = functime;
    console.log('inside set timer', this.timer);
        // debugger;
    let time: any[] = this.timer.split(':');

    if (time[2] == 0) {
      this.sec = 60;
      this.min = parseInt(time[1]) - 1;
      this.hr = parseInt(time[0]);
    } else {
      this.sec = parseInt(time[2]);
      this.min = parseInt(time[1]);
      this.hr = parseInt(time[0]);
    }

    this.interval = setInterval(() => {
      if (this.sec > 0) {
        this.sec--;
        if (this.sec == 0 && this.min > 0) {
          this.sec = 60;
          this.min--;
        }
        if (this.min == 0 && this.hr > 0) {
          this.sec = 60;
          this.min = 59;
          this.hr--;
        }
        if (this.hr == 0 && this.min == 0 && this.sec == 0) {
          this.submitQuiz();
        }
      }
    }, 1000);
  }

  quizlist() {
    alert('dd');

    //state service
    // this.service.getStatusList(this.uid, this.qid).subscribe((res: any) => {
    //   this.mydata = res;
    //   console.log(this.mydata, 'This is status');
    //   for (let i = 0; i < this.mydata.length; i++) {
    //     console.log(this.remainingTime);
    //     if (this.mydata[i].userans == this.mydata[i].userqu.answer) {
    //       this.score += 1;
    //       console.log('myscore', this.score);
    //     } else {
    //       this.score = this.score;
    //     }
    //   }
    //   // this.timer=this.mydata[this.mydata.length-1].remainingtime;
    //   // this.setTimer(this.timer);
    // });

    this.service.getallquestions(this.qid).subscribe((res: any) => {
      this.que = res;
      console.log(this.que);

      console.log(this.mydata + 'sssss');
      if(this.mydata.length != 0){
        this.setTimer(this.timer);
      }
      else{
        this.service.getTimer(this.qid).subscribe((res: any) => {
          this.timer = res.time;
        this.setTimer(this.timer);
        })
      }

      for (let i: any = 0; i < this.que.length; i++) {
        if (this.mydata.length != 0) {
          console.log('inside if', this.timer);

        
          for (let j: any = 0; j < this.mydata.length; j++) {
            if (this.que[i].id == this.mydata[j].questionId) {
              // console.log("if ",this.ques[ele]);
              
              this.ques[i] = {
                ...this.que[i],
                status: true,
                userAns: this.mydata[j].userans,
              };

              console.log('if ', this.ques[i], i, j);
              break;
            } else {
              this.ques[i] = { ...this.que[i], status: false };
              console.log('else in', this.ques[i], i, j);
            }
          }
        } 
        else {
        
          this.ques[i] = { ...this.que[i], status: false };
          console.log('else in 2', this.ques[i]);
        }
      }
      console.log(this.que);

      console.log(this.ques, 'All Questions');
    });
  }

  setAnswer(option: string, questionid: number, ans: string, question: any) {
    this.qidid = questionid;
    let quizId = this.qid.toString();
    option == ans ? (this.score += 1) : this.score;
    console.log(
      <HTMLInputElement>document.getElementById(quizId + this.qidid + '1')
    );
    (<HTMLInputElement>(
      document.getElementById(quizId + this.qidid + '1')
    )).disabled = true;
    (<HTMLInputElement>(
      document.getElementById(quizId + this.qidid + '2')
    )).disabled = true;
    (<HTMLInputElement>(
      document.getElementById(quizId + this.qidid + '3')
    )).disabled = true;
    (<HTMLInputElement>(
      document.getElementById(quizId + this.qidid + '4')
    )).disabled = true;

    var opt1 = (<HTMLInputElement>(
      document.getElementById(quizId + this.qidid + '11')
    )).innerText;
    var opt2 = (<HTMLInputElement>(
      document.getElementById(quizId + this.qidid + '22')
    )).innerText;
    var opt3 = (<HTMLInputElement>(
      document.getElementById(quizId + this.qidid + '33')
    )).innerText;
    var opt4 = (<HTMLInputElement>(
      document.getElementById(quizId + this.qidid + '44')
    )).innerText;

    if (opt1 == ans) {
      (<HTMLInputElement>(
        document.getElementById(quizId + this.qidid + '11')
      )).classList.add('correct');
    } else if (opt2 == ans) {
      (<HTMLInputElement>(
        document.getElementById(quizId + this.qidid + '22')
      )).classList.add('correct');
    } else if (opt3 == ans) {
      (<HTMLInputElement>(
        document.getElementById(quizId + this.qidid + '33')
      )).classList.add('correct');
    } else if (opt4 == ans) {
      (<HTMLInputElement>(
        document.getElementById(quizId + this.qidid + '44')
      )).classList.add('correct');
    }
    let time = this.hr + ':' + this.min + ':' + this.sec;

    this.correctans = true;
    let status = {
      quizeId: this.qid,
      userId: this.uid,
      userans: option,
      questatus: true,
      questionId: questionid,
      remainingtime: time,
    };
    console.log('timer' + time);

    this.service.insertstatus(status).subscribe((res: any) => {
      console.log(res);
    });
  }

  //descriptive question
  onblurdesc(questionid: number, questionanswer: string, event: any) {
    let value = event.target.value;
    console.log(value + 'value by text');
    let time = this.hr + ':' + this.min + ':' + this.sec;

    let status = {
      quizeId: this.qid,
      userId: this.uid,
      userans: value,
      questatus: true,
      questionId: questionid,
      remainingtime: time,
    };
    questionanswer == value ? (this.score += 1) : this.score;
    this.service.insertstatus(status).subscribe((res: any) => {
      console.log(res);
    });
  }

  //submit quiz and timer off
  submitQuiz() {
    console.log(this.score);

    let score = {
      score: this.score,
      quizeId: this.qid,
      userId: this.uid,
    };
    this.service.saveScore(score).subscribe((res: any) => {
      console.log(res);
    });
    this.router.navigate(['/fav']);
  }

  
}
