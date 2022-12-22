import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = environment.API_URL
  optionRequest = {
    headers: new HttpHeaders({
      'Content-type': 'applcation/json'
    }), responseType: 'text' as 'json'
  }

  public user: Observable<string>
  public userSubject: BehaviorSubject<string>

  constructor(
    private http: HttpClient
  ) {
      this.userSubject = new BehaviorSubject<string>(localStorage.getItem('UserToken') || '')
      this.user = this.userSubject.asObservable()
    }
  
  login(username: String, password: String) {
    return this.http.post(`${this.API_URL}/authenticate`, {username: username, password: password}, this.optionRequest)
  }

  register(username: string, password: string, role: number) {
    return this.http.post(`${this.API_URL}/authenticate`, {username: username, password: password, role: role}, this.optionRequest)
  }

}
