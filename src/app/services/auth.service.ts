import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ILoginResponse {
  token: string;
  refresh_token: string;
  expires_at: string;
}

interface ILoginPayload {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  baseUrl = 'http://order3-api-dev.utr.ua:5455/api/'

  login(data: ILoginPayload): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(
      `${this.baseUrl}login_check`,
      { ...data, browser_fingerprint: 'some-unique-key-here' },
    );
  }
}
