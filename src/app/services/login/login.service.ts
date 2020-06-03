import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  public checkLogin(userDetails): Observable<any> {
    const url = "http://localhost:4000/" + 'credentials';
    return this.httpClient.get(url, {params: userDetails});
  }

  public saveLoggedInUser(user): Observable<any> {
    const userData = user;
    const url = "http://localhost:4000/" + 'saveLoggedInUser';
    return this.httpClient.post(url, userData);
  }

  public retreivedLoggedInUser(): Observable<any> {
    const url = "http://localhost:4000/" + 'loggedInUser';
    return this.httpClient.get(url);
  }

  public clearUserCache(): Observable<any> {
    const url = "http://localhost:4000/" + 'deleteSavedUser';
    return this.httpClient.delete(url);
  }

  public recover(queryItem): Observable<any> {
    const url = "http://localhost:4000/" + 'retreive';
    return this.httpClient.get(url, {params: queryItem});
  }
}
