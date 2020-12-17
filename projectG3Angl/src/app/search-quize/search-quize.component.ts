// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { SearchQuizeService } from '../search-quize.service';

// @Component({
//   selector: 'app-search-quize',
//   templateUrl: './search-quize.component.html',
//   styleUrls: ['./search-quize.component.scss'],
// })
// export class SearchQuizeComponent implements OnInit {
//   quizes?: any;
//   quizname:any;

//   constructor(
//     private quizeService: SearchQuizeService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     // this.retrieveQuizes();
//   }

//   // retrieveQuizes(): void {
//   //   this.quizeService.getAll()
//   //     .subscribe(
//   //       data => {
//   //         this.quizes = data;
//   //         console.log(data);
//   //       },
//   //       error => {
//   //         console.log(error);
//   //       });
//   // }

//   searchTitle(): void {
//     this.quizeService.findByTitle(this.quizname).subscribe(
//       (data) => {
//         this.quizes = data;
//         console.log(data);
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//   }
// }
