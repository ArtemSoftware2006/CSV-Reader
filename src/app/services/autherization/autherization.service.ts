import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IToken } from '../../entity/token';
import { IUser } from '../../entity/user';
import { JwtDecoderService } from '../jwtDecoder/jwt-decoder.service';

@Injectable({
  providedIn: 'root',
})
export class AutherizationService {

  private readonly BASE_URL = 'http://localhost:5149/api'; 
  private isLogged = false;
  private user? : IUser;
  constructor(private httpClient : HttpClient,
    private jwtDecoder : JwtDecoderService) { 
  }

  public login(email : string, password : string) {
    this.httpClient.post<IToken>(
      this.BASE_URL + '/Authorization/Login', 
      {email, password}
    ).subscribe((authResult : IToken) => {
      this.setSession(authResult);
    })
  } 
  public registration(email : string, password : string, passwordConfirm : string) {
    this.httpClient.post<IToken>(
      this.BASE_URL + '/Authorization/Registration',
      {email, password, passwordConfirm}
    ).subscribe((authResult : IToken) => {
      this.setSession(authResult);
    });
  } 

  public getUser() : IUser | undefined {
    return this.user;
  }

  public isLogging() {
    return this.isLogged;
  }

  public logout() {
    this.isLogged = false;
    localStorage.removeItem('token');
  }

  private setSession(authResult : IToken) {
    console.log(authResult.token);
    this.isLogged = true;
    localStorage.setItem("token", authResult.token);

    const tokenDecoded = this.jwtDecoder.parseToken(authResult.token);

    this.user = {
      id: tokenDecoded?.userId,
      name: tokenDecoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
      role: tokenDecoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    };

    console.log(this.user);
  }
}
