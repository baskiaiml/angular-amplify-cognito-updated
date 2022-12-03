import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders  } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CognitoService } from './cognito.service';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class ApiGatewayService {

  backend_url: string =  environment.resourceServerURL; 
  token:any;
  constructor(public http: HttpClient, private localStorageService:LocalService) {
   
  }

  getMessage() {
    let token = this.localStorageService.getData("JWT_TOKEN");
    console.log("-->",token);
    return this.http.get(this.backend_url + '/' + 'example', {headers:{'Authorization': 'Bearer '+`${token}`}});
  }

  /*
  {{headers:{'Content-Type':'text/plain','Accept':'text/plain',
    'Access-Control-Allow-Methods':'OPTIONS,GET,PUT,POST,DELETE,PATCH,HEAD',
    'Access-Control-Allow-Credentials':'true',
    'Authorization': 'Bearer '+`${token}`,
    'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent,x-api-key',
    'Access-Control-Allow-Origin':'*'}}*/
}
