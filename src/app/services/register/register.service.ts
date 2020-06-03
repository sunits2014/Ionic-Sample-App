import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) { }

  public registerUser(userDetails): Observable<any> {
    const url = "http://localhost:4000/" + 'register';
    return this.httpClient.post(url, userDetails);
  }
}
