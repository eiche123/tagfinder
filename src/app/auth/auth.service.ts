import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  private authenticationError = false;

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public updateToken(accessToken: string) {
    localStorage.setItem('token', accessToken);
    this.authenticationError = false;
  }

  public setAuthenticationError() {
    this.authenticationError = true;
  }

  public hasAuthenticationError(): boolean {
    return this.authenticationError;
  }
}
