import { Component , OnInit , OnDestroy } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
    selector : 'app-home-page',
    templateUrl : './home-page.component.html',
    styleUrls : ['./home-page.component.css']
})

export class HomePageComponent implements OnInit , OnDestroy {
    public colorTheme : string = '';
    public modalTitle : string = '';
    public modalTextColor : string = '';
    public modalWarning : string = '';
    public modalBgColor : any;
    public token : any;
    public logo : string = '';
    public info : string = '';
    public teacher : string = '';
    public buttonColor : string = '';
    public infoDates : string = '';
    public searchText : string = '';
    public searchLesson : string = '#';
    public isTrue : boolean = false;

    public anim = setTimeout(() =>  {
        let lessons = document.getElementsByClassName('mainBlock');
        for(let i = 0 ; i < lessons.length ; i++) {
            lessons[i].setAttribute('style','transition:all 4s ease;transform:rotateY(360deg);');
        }
    },0);

    public anim2 : any;
    
    constructor(private storage : StorageService) { 
        
    }

    ngOnInit() {
        
        this.anim2 = (function() {
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

        let modalLink = document.getElementsByClassName('register_link');
        for(let i = 0 ; i < modalLink.length ; i++) {
            modalLink[i].addEventListener('click',() => {
                if (!localStorage.token) {
                    modalLink[i].setAttribute('data-target','#exampleModalCenter');
                    this.colorTheme = this.storage.arrayForInfo[i].colorTheme;
                    this.modalTextColor = this.storage.arrayForInfo[i].modalTextColor;
                    this.modalTitle = this.storage.arrayForInfo[i].title;
                    this.modalWarning = this.storage.arrayForInfo[i].modalWarning;
                }
                else {
                    modalLink[i].setAttribute('data-target','#exampleModal3');
                    this.modalBgColor = this.storage.arrayForInfo[i].bgColor;
                }
            });
        }
    }

    ngOnDestroy() {
        window.onscroll = null;
    }

    toScroll() {
        document.documentElement.scrollTop = 0;
    }

    showHideInfo(dynamic) {
        let parentBlock = dynamic.parentElement;
        let hiddenBlock = parentBlock.previousSibling;
        let iconSecond = dynamic.nextSibling;
        let lessonsLists = document.getElementsByClassName('listBlock');
        for(let i = 0 ; i < lessonsLists.length ; i++) {
            lessonsLists[i].setAttribute('style','display:none;');
        }
        let iconsUp = document.getElementsByClassName('iconUp');
        for(let i = 0 ; i < iconsUp.length ; i++) {
             iconsUp[i].setAttribute('style','display:none;');
        }
        let iconsDown = document.getElementsByClassName('iconDown');
        for(let i = 0 ; i < iconsUp.length ; i++) {
            iconsDown[i].setAttribute('style','display:block;');
        }
        hiddenBlock.style.display = 'block';
        dynamic.style.display = 'none';
        iconSecond.style.display = 'block';
    }

    hideShowInfo(dynamic) {
        let parentBlock = dynamic.parentElement;
        let hiddenBlock = parentBlock.previousSibling;
        let iconFirst = dynamic.previousSibling;
        hiddenBlock.style.display = 'none';
        dynamic.style.display = 'none';
        iconFirst.style.display = 'block';
    }

    showStyles(buttonElem) {
        buttonElem.style.backgroundColor = '#6C757D';
    }

    hideStyles(buttonElem) {
        buttonElem.style.backgroundColor = '#BA55D3';  
    }

    showModalPic(event) {
        let parentImages = document.getElementsByClassName('card-img-top');
        let modalImage = document.getElementById('modalImg');
        for(let i = 0 ; i < parentImages.length ; i++) {
            if (event.target == parentImages[i]) {
                modalImage.setAttribute('src',this.storage.arrayForInfo[i].src);
            }
        }
    }

    showSignUpPage(title) {
        for(let i = 0 ; i < this.storage.arrayForInfo.length ; i++) {
            if (title.innerText == this.storage.arrayForInfo[i].title) {
                this.storage.title = title.innerText;
                this.token = this.storage.arrayForInfo[i].token;
                this.logo = this.storage.arrayForInfo[i].src;
                this.info = this.storage.arrayForInfo[i].info;
                this.teacher = this.storage.arrayForInfo[i].teacher;
                this.buttonColor = this.storage.arrayForInfo[i].buttonColor;
                this.infoDates = this.storage.arrayForInfo[i].date;
            }
        }
        this.token++;
        let thisLesson = {
            title : this.storage.title,
            token : this.token,
            lessonLogo : this.logo,
            info : this.info,
            teacher : this.teacher,
            bgColor : this.buttonColor,
            dates : this.infoDates
        };
        if (this.storage.lessonsArray.length == 0) {
            this.storage.lessonsArray.push(thisLesson);
            localStorage.setItem('user',JSON.stringify(this.storage.lessonsArray));
        }
        else {
            this.storage.lessonsArray.splice(0,1);
            this.storage.lessonsArray.push(thisLesson);
            localStorage.setItem('user',JSON.stringify(this.storage.lessonsArray));
        }
    }

    openListContainer() {
        let action = setTimeout(() => {
            this.isTrue = true;
            setTimeout(() => {
                window.onclick = () => {
                    if (this.isTrue == true) {
                        this.isTrue = false;
                    }
                }
            },0);
            return action;
        },0);
    }

    giveValue(list) {
        for(let i = 0 ; i < this.storage.searchArray[0].length ; i++) {
           if (list.innerText == this.storage.searchArray[0][i]) {
               this.searchText = list.innerText;
               if (this.searchText == list.innerText && this.searchText != '') {
                    this.searchLesson = this.storage.searchArray[1][i];
               }
           }
        }
    }

    toClear() {
        this.searchText = '';
        this.searchLesson = '#';
    }

    writeText() {
        let lists = document.querySelectorAll('.lessons_list');
        if (this.searchText != '') {           
            lists.forEach(item => {
                if (item.innerHTML.search(this.searchText) == -1) {
                    item.classList.add('hide');
                }  
            });           
        }
        else {
            lists.forEach(item => {
                item.classList.remove('hide'); 
            }); 
        }
    }
 
}
