import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { McqComponent } from './mcq/mcq.component';
import { NavFavComponent } from './nav-fav/nav-fav.component';
// import { SearchQuizeComponent } from './search-quize/search-quize.component';

const routes: Routes = [
  { path: 'mcq/:id', component: McqComponent },
  { path: 'fav', component: NavFavComponent },
  // { path: 'quizes', component:SearchQuizeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
