import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class JwtDecoderService {

  constructor() { }

  public parseToken(token : string) : any {
    return jwtDecode(token);
  }
}
