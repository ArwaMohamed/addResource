import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EventService } from '../service/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @Inject(DOCUMENT) private document!: Document
  constructor(private translateService: TranslateService,private eventsService:EventService) {}
  changeLangage(lang: string) {
    document.body.dir = lang=='ar' ? "rtl":"ltr"
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
    lang=='ar'? this.changeLang('arabicStyle.css'):this.changeLang('englishStyle.css')
    this.eventsService.changeLanguage();
}


  // change style file depend on Language
  changeLang(cssFile:string){
    const headEl = document.head.getElementsByTagName('link')[2];
    headEl.setAttribute('href', cssFile);
  }
}
