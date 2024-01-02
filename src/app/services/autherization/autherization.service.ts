import { IToken } from './../../entity/token';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../../entity/user';
import { JwtDecoderService } from '../jwtDecoder/jwt-decoder.service';
import { Subject, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutherizationService {

  private readonly BASE_URL = 'http://localhost:5149/api'; 
  private isLogged : Subject<boolean> = new Subject<boolean>();
  private user : Subject<IUser> = new Subject<IUser>();
  constructor(private httpClient : HttpClient,
    private jwtDecoder : JwtDecoderService) { 
  }

  public login(email : string, password : string) {
    return new Promise<boolean>((resolve, reject) => {
      this.httpClient.post<IToken>(
        this.BASE_URL + '/Authorization/Login',
        { email, password }
      ).pipe(
        catchError(err => {
          console.log(err);
          if (err.status === 403) {
            resolve(false); // возвращает false в случае ошибки 403
          }
          return throwError(err);
        }),
        map((authResult: IToken) => {
          this.setSession(authResult);
          return true; // возвращает true в случае успешной авторизации
        })
      ).subscribe((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  } 
  public registration(email : string, password : string, passwordConfirm : string) {
    return new Promise<boolean>((resolve, reject) => {
      this.httpClient.post<IToken>(
        this.BASE_URL + '/Authorization/Registration',
        {email, password, passwordConfirm}
      ).pipe(
        catchError(err => {
          console.log(err);
          if (err.status === 403) {
            resolve(false); // возвращает false в случае ошибки 403
          }
          return throwError(err);
        }),
        map((authResult: IToken) => {
          this.setSession(authResult);
          return true; // возвращает true в случае успешной авторизации
        })
      ).subscribe((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    }); 
  } 

  public getUser() {
    return this.user;
  }

  public isLogging() {
    return this.isLogged;
  }

  public logout() {
    this.isLogged.next(false);
    localStorage.removeItem('token');
  }

  private setSession(authResult : IToken) {
    console.log(authResult.token);
    this.isLogged.next(true);
    localStorage.setItem("token", authResult.token);

    const tokenDecoded = this.jwtDecoder.parseToken(authResult.token);

    this.user.next({
      id: tokenDecoded?.userId,
      name: tokenDecoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
      role: tokenDecoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    });

    console.log(this.user);
  }
}
