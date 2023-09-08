import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'addResource';
  language: any= 'en'
  @Inject(DOCUMENT) private document!: Document
  constructor(private translateService: TranslateService) {
    localStorage.setItem('lang',this.language)
  }

}
