import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CommonService } from './common.service';
import { AppComponent } from './app.component';
import {HomePage  } from "./home/home.page";
import { AppRoutingModule } from './app-routing.module';
import { HomePageRoutingModule } from './home/home-routing.module';
import { Helper } from './provider/helper';

@NgModule({
  declarations: [AppComponent,HomePage],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpModule, FormsModule,ReactiveFormsModule,HomePageRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },CommonService,Helper,],
  // providers: [CommonService],
  bootstrap: [AppComponent],
})
export class AppModule { }
