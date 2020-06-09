import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { LessonPageComponent } from './components/lesson-page/lesson-page.component';
import { CancelEnrollingComponent } from './components/cancel-enrolling/cancel-enrolling.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';


@NgModule({
    declarations : [
        AppComponent,
        HomePageComponent,
        SignUpPageComponent,
        LessonPageComponent,
        CancelEnrollingComponent,
        NotFoundPageComponent
    ],
    imports : [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
    providers : [],
    bootstrap : [AppComponent]
})

export class AppModule { }
