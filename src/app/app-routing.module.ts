import { NgModule } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CancelEnrollingComponent } from './components/cancel-enrolling/cancel-enrolling.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { LessonPageComponent } from './components/lesson-page/lesson-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';


const routes : Routes = [
    {path : '' , redirectTo : '/home-page' , pathMatch : 'full'},
    {path : 'home-page' , component : HomePageComponent},
    {path : 'cancel-page' , component : CancelEnrollingComponent},
    {path : 'sign-up-page/:title' , component : SignUpPageComponent},
    {path : 'lesson-page/:lesson' , component : LessonPageComponent},
    {path : '**' , component : NotFoundPageComponent}
];

@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule]
})

export class AppRoutingModule { }
