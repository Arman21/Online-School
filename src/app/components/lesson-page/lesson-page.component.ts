import { Component , OnInit , OnDestroy } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector : 'app-lesson-page',
    templateUrl : './lesson-page.component.html',
    styleUrls : ['./lesson-page.component.css']
})

export class LessonPageComponent implements OnInit , OnDestroy {
    public counter : number = 0;
    public bgColor : string = '';
    public buttonColor  : string = '';
    public anim : any;
    public userDates : any;
    public userInfo : boolean = false;
    public click : boolean = false;
    public time : string = '';
    public dateColor : string = '';
    public question = confirm;

    constructor(private storage : StorageService , private router : ActivatedRoute) { 

    }

    public showPage = func => {
        let someInfo = JSON.parse(localStorage.getItem('user'));
        if (this.storage.hiddenAlert == true) {
            this.storage.hiddenAlert = true;
            for(let i = 0 ; i < someInfo.length ; i++) {
                this.storage.newTitle = someInfo[i].title;
            }
        }
        else {
            this.userDates = JSON.parse(localStorage.getItem('fullDates'));
            this.storage.lessonsArray = this.userDates;
            func();
            if (this.storage.hiddenAlert2 == true) {
                this.storage.hiddenAlert2 = true;
                func();
            }
        }
    }

    public userPage = () =>  {
        setTimeout(() => {
            let returnDates = (text,yes,no) => {
                if (this.question == confirm) {
                    if (this.question(text)) yes();
                    else no();
                }
                else {
                    if (this.storage.hiddenAlert2 == true) no();
                    else yes();
                }
            }
            setTimeout(() => {
                let toConfirm = () => {
                    this.userInfo = true;
                    this.storage.hiddenAlert2 = false;
                    this.router.params.subscribe(param => {
                        for(let i = 0 ; i < this.storage.lessonsArray.length ; i++) {
                            if (this.storage.lessonsArray[i].title == param.lesson) {
                                this.bgColor = '#fff';
                                this.buttonColor = this.storage.lessonsArray[i].bgColor; 
                                this.time = this.storage.lessonsArray[i].dates;  
                                this.dateColor = this.storage.lessonsArray[i].bgColor;        
                            }
                        }
                    });
                }
                let toRemove = () => {
                    this.storage.hiddenAlert2 = true;
                    this.userInfo = false;
                }
                returnDates(`Հարգելի դիմորդ ձեր տվյալները մուտքագրված են,դիտե՞լ արդյունքը:`,toConfirm,toRemove)
            },0);
        },0);
    }

    ngOnInit()  {
        for(let i = 0 ; i < this.storage.lessonsArray.length ; i++) {
            this.storage.newTitle = this.storage.lessonsArray[i].title;
        }

        for(let i = 0 ; i < this.storage.lessonsArray.length ; i++) {
            this.storage.lesson = this.storage.lessonsArray[i].title;
        }

        this.anim = (function() {
            function scroll() {
                let iconUp = document.getElementsByClassName('iconDirect')[0];
                if (document.documentElement.scrollTop > 300) {
                    iconUp.setAttribute('style','display:block;');
                }
                else {
                    iconUp.setAttribute('style','display:none;');
                }
            }

            window.onscroll = function() {
                scroll();
            }
        })();

        if (this.storage.hiddenAlert2 == true) {
            this.question = null;
            this.userInfo = false;
        }

        if (localStorage.length == 4) {  
            this.storage.hiddenAlert = false;
            this.userPage();
        }

        window.onload = () => {
            this.question = null;
            if (this.storage.hiddenAlert2 == true) {
                this.userInfo = false; 
                this.showPage(this.userPage);
            }
            else {
                this.userInfo = true; 
                this.showPage(this.userPage);
            }
        }
    }

    ngOnDestroy() {
        window.onscroll = null;
        this.question = null;
        setTimeout(() => {
            localStorage.removeItem('user');
            localStorage.removeItem('fullInfo');
            localStorage.removeItem('fullDates');
        },600000);
    }

    toScroll() {
        document.documentElement.scrollTop = 0;
    }
}
