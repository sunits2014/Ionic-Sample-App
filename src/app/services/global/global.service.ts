import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public loggedInUser: BehaviorSubject<any>;

  constructor() {
    this.loggedInUser = new BehaviorSubject({});
   }
}
