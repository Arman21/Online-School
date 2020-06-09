    import { Component , OnInit } from '@angular/core';
    import { StorageService } from '../../services/storage.service';
    
    @Component({
        selector : 'app-sign-up-page',
        templateUrl : './sign-up-page.component.html',
        styleUrls : ['./sign-up-page.component.css']
    })

    export class SignUpPageComponent implements OnInit {
        public token : any;
        public userName : string = '';
        public userSurname : string = '';
        public userAge : string = '';
        public userMobile : string = '';
        public userEmail : string = '';
        public givenData : any;
        public dates : Array<any> = [];

        public clickForInputs = function() {
            let inputs = document.getElementsByClassName('dates');
            for(let i = 0 ; i < inputs.length ; i++) {
                inputs[i].addEventListener('focus',() => {
                    inputs[i].setAttribute('style','border:5px solid rgb(14,199,231);');
                });
                inputs[i].addEventListener('blur',() => {
                    inputs[i].setAttribute('style','border:5px solid rgb(180,177,177);');
                });
            }
        };

        constructor(private storage : StorageService) {

        }

        ngOnInit() {
            let newLessonsArray = JSON.parse(localStorage.getItem('user'));
            this.storage.lessonsArray = newLessonsArray;

            for(let i = 0 ; i < this.storage.lessonsArray.length ; i++) {
                this.storage.lesson = this.storage.lessonsArray[i].title;
                this.token = this.storage.lessonsArray[i].token;
            }

            this.clickForInputs();

            let inputs = document.getElementsByClassName('dates');

            if (localStorage.info) {
                this.givenData = JSON.parse(localStorage.getItem('info'));
                this.userName = this.givenData[0];
                this.userSurname = this.givenData[1];
                this.userAge = this.givenData[2];
                this.userMobile = this.givenData[3];
                this.userEmail = this.givenData[4];
                for(let i = 0 ; i < this.givenData.length ; i++) {
                    if (this.givenData[i] == '') {
                        inputs[i].setAttribute('style','border:5px solid rgb(14,199,231);');  
                        inputs[4].setAttribute('style','border:5px solid rgb(180,177,177);');
                    }
                    if (this.givenData[i] == null) {
                        inputs[i].setAttribute('style','border:5px solid rgb(14,199,231);');  
                        inputs[4].setAttribute('style','border:5px solid rgb(180,177,177);');
                    }
                }
            }
            if (localStorage.token) {
                this.userName = this.userSurname = this.userAge = this.userMobile = this.userEmail = '';
                for(let i = 0 ; i < inputs.length ; i++) {
                    if (localStorage.info == null) {
                        inputs[i].setAttribute('style','border:5px solid rgb(180,177,177);'); 
                    }                       
                }
                this.storage.hiddenAlert2 = true;
                setTimeout(() => {
                    localStorage.removeItem('fullInfo');
                    localStorage.removeItem('fullDates');
                    localStorage.removeItem('user');
                },600000);
            }
        }

        showLessonPage() {
            if (localStorage.length != 4) {
                this.dates.push(this.userName,this.userSurname,this.userAge,this.userMobile,this.userEmail,
                this.storage.lesson,this.token);
                if (this.userName == '' || this.userSurname == '' || this.userAge == '' || 
                this.userMobile == '' || this.userName.length < 3 || this.userSurname.length < 5 ||
                +this.userAge < 18 || this.userMobile.length < 9) {
                    localStorage.setItem('info',JSON.stringify(this.dates));
                }
                else {
                    for(let i = 0 ; i < this.storage.lessonsArray.length ; i++) {
                        this.storage.webToken = this.storage.lessonsArray[i].token;
                        this.storage.arrayForInfo[i].token = this.storage.webToken;
                        this.storage.lessonsArray[i].name = this.userName;
                        this.storage.lessonsArray[i].surname = this.userSurname;
                        this.storage.lessonsArray[i].age = this.userAge;
                        this.storage.lessonsArray[i].mobile = this.userMobile;
                        this.storage.lessonsArray[i].email = this.userEmail;
                    };
                    if (localStorage.info) {
                        localStorage.removeItem('info');
                    }
                    localStorage.setItem('fullInfo',JSON.stringify(this.dates));
                    localStorage.setItem('token',JSON.stringify(this.storage.webToken));
                    localStorage.setItem('fullDates',JSON.stringify(this.storage.lessonsArray));         
                }
            }        
        }
    }
