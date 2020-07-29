import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CommentsComponent } from './comments/comments.component';
import { RatingsComponent } from './ratings/ratings.component';
import { PlaygroundComponent } from './playground/playground.component';
import { StaffComponent } from './staff/staff.component';
import { CrotchetComponent } from './crotchet/crotchet.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CommentsComponent,
    RatingsComponent,
    PlaygroundComponent,
    StaffComponent,
    CrotchetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
