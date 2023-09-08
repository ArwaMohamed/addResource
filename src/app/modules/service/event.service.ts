import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private changeLang = new BehaviorSubject(localStorage.getItem('rental_lang'));
  changeLangObser = this.changeLang.asObservable();
  constructor() { }

  changeLanguage() {
    this.changeLang.next(localStorage.getItem('rental_lang'));
  }
}
