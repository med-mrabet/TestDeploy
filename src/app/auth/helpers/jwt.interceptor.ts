import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'environments/environment';
import { AuthenticationService } from 'app/auth/service';
import { MsalService } from '@azure/msal-angular';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  public accessToken

  /**
   *
   * @param {AuthenticationService} _authenticationService
   */
  constructor(private _authenticationService: AuthenticationService,private _msalService:MsalService) {}

  /**
   * Add auth header with jwt if user is logged in and request is to api url
   * @param request
   * @param next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('iam med')
    const currentUser = this._authenticationService.currentUserValue;
    const account = this._msalService.instance.getAllAccounts()[0]
    this._msalService.instance.setActiveAccount(account);
        
        const tokenRequest = {
         scopes: ["openid", "profile","user.read"], // Replace with your desired scopes
         account:account      
       };
   
   this._msalService.instance.acquireTokenSilent({scopes:["openid","profile"],account:account}).then((res)=>{this.accessToken = res.accessToken}) 
  const isLoggedIn = currentUser && currentUser.token;
   const isApiUrl = request.url.startsWith(environment.apiUrl);
   if (isApiUrl) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.accessToken}`
      }
    });
   }
    
    return next.handle(request);
  }
}
