import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { NavFavComponent } from './nav-fav/nav-fav.component';
import { FormsModule } from '@angular/forms';
import { StatusComponent } from './status/status.component';
import { McqComponent } from './mcq/mcq.component';
import { AngularMaterialModule } from './angular-material.module';
import { AddtoFavComponent } from './addto-fav/addto-fav.component';
import { ChartsComponent } from './charts/charts.component';
import { ChartsModule } from 'ng2-charts';

// import { SearchQuizeComponent } from './search-quize/search-quize.component';

// For MDB Angular Free

@NgModule({
  declarations: [
    AppComponent,
    NavFavComponent,
    StatusComponent,
    McqComponent,AddtoFavComponent, ChartsComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    ChartsModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
