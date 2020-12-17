import { Component, OnInit } from '@angular/core';
import { Addfav } from '../addfav';
import { AddtoFavService } from '../addto-fav.service';
import { SearchQuizeService } from '../search-quize.service';
import { resolve } from 'dns';



@Component({
  selector: 'app-addto-fav',
  templateUrl: './addto-fav.component.html',
  styleUrls: ['./addto-fav.component.scss']
})
export class AddtoFavComponent implements OnInit {
  selected: boolean = false;
  uid = 2;
  qid = 1;
  mydata: any;
  quizes: any;
  ql: any;
  ml: any;
  quizess: any = [];
  constructor(private myserv: AddtoFavService, private serv: Addfav, private quizServ: SearchQuizeService) {


    //console.log(this.quizes.length);


    this.myserv.getFavListOfUser(this.uid).subscribe((res: any) => {
      this.mydata = res;
      console.log("data", this.mydata);
      this.ml = res.length;

    });

    this.quizServ.findAllquize().subscribe((res: any) => {
      this.quizes = res;
      this.ql = res.length;
      console.log("all quizes", this.quizes);

    });
    //console.log(this.mydata.length);
  }

  ngOnInit(): void {




  }

  buttons: any;
  toggleSelected(qid: any, i: any,ev:any): void {
     alert("toggle " + qid + ev);
    alert(this.quizess[i].status);
       this.quizess[i].status=!this.quizess[i].status;

    let data = this.mydata.find((item: { quizeId: any; }) => item.quizeId === qid);
   


     if(this.quizess[i].status==true){
    if (data == undefined)
     {
      let fav = {
        "userid": this.uid,
        "quizid": qid,
        "status": true
      }
        this.myserv.insertFav(fav).subscribe((res) => {
        console.log(fav);

      });

    } 
    else {
      console.log("inside else1");
      let updateStatus = {
        "status": true,
        "userId": this.uid
      }
      this.myserv.updateFav(qid, updateStatus).subscribe((res) => {
       console.log(res);
      })
    }
    }
    else{
      alert("inside else");
      //debugger;
      alert("qid"+qid);
      let updateStatus = {
        "status": false,
        "userId":this.uid }
          this.myserv.updateFav(qid,updateStatus).subscribe((res)=>{
            //console.log(fav);
          })
    }


  }

  showQuize() {
    //if there is no data in favourite list
          if(this.ml==0){
            for (let i: any = 0; i < this.ql; i++) {
              this.quizess[i] = {
                ...this.quizes[i],
                status: false
                // userAns: this.mydata[j].userans,
              };
            }
          }

    if (this.ql >= this.ml) {
      for (let i: any = 0; i < this.ql; i++) {
        for (let j: any = 0; j < this.ml; j++) {

          if (this.quizes[i].id == this.mydata[j].quizeId) {
            // console.log("if ",this.ques[ele]);

            this.quizess[i] = {
              ...this.quizes[i],
              status: this.mydata[j].status
              // userAns: this.mydata[j].userans,
            };


            break;
          }
          else {
            this.quizess[i] = {
              ...this.quizes[i],
              status: false,

            };
          }
        }


      }
    }
    else {
      for (let i: any = 0; i < this.ml; i++) {
        for (let j: any = 0; j < this.ml; j++) {
          if (this.quizes[i].id == this.mydata[j].quizeId) {
            // console.log("if ",this.ques[ele]);

            this.quizess[j] = {
              ...this.quizes[j],
              status: this.mydata[i].status
              // userAns: this.mydata[j].userans,
            };


            break;
          }
          else {
            this.quizess[j] = {
              ...this.quizes[j],
              status: false

            };
          }
        }


      }
      console.log("asdaZDadsadsa", this.quizess);

    }


  }



}
