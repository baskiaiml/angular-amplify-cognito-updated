import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Amplify, Auth } from 'aws-amplify';
import { from } from 'rxjs';
import { environment } from '../../environments/environment';
import { LocalService } from './local.service';

export interface IUser {
  email: string;
  password: string;
  showPassword: boolean;
  code: string;
  name: string;
  username:string;
}

@Injectable({
  providedIn: 'root',
})
export class CognitoService {

   private authenticationSubject: BehaviorSubject<any>;

  constructor(private localStorageService:LocalService) {
    Amplify.configure({
      Auth:{       
        userPoolId: environment.cognito.userPoolId,
        userPoolWebClientId: environment.cognito.userPoolWebClientId
      }
    });

    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public signUp(user: IUser): Promise<any> {
    const email = user.email;
    const name = user.name;
    return Auth.signUp({
      username: user.username,
      password: user.password,
      attributes:{email, name}
    });
  }

  public confirmSignUp(user: IUser): Promise<any> {
    return Auth.confirmSignUp(user.username, user.code);
  }

  public signIn(user: IUser): Promise<any> {
    return Auth.signIn(user.email, user.password)
    .then(() => {
      this.authenticationSubject.next(true);
      this.getCurrentIdToken();
    });
  }

  public signOut(): Promise<any> {
    return Auth.signOut()
    .then(() => {
      this.authenticationSubject.next(false);
    });
  }

  public isAuthenticated(): Promise<boolean> {
    if (this.authenticationSubject.value) {
      return Promise.resolve(true);
    } else {
      return this.getUser()
      .then((user: any) => {
        if (user) {
          return true;
        } else {
          return false;
        }
      }).catch(() => {
        return false;
      });
    }
  }

  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  public updateUser(user: IUser): Promise<any> {
    return Auth.currentUserPoolUser()
    .then((cognitoUser: any) => {
      return Auth.updateUserAttributes(cognitoUser, user);
    });
  }
 public getCurrentIdToken(): any {
  from(Auth.currentSession()).subscribe({
    next:(resp:any)=>{
      let idToken = resp.idToken.jwtToken      
      this.localStorageService.saveData("JWT_TOKEN",idToken);
    },
    error:(error)=>{
      console.info('Error in token fetch') 
    },
    complete: () => console.info('token fetch complete')
  });  
  }
}