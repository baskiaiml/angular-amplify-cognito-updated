import { Component, OnInit } from '@angular/core';
import { ApiGatewayService } from '../services/api-gateway.service';
import { HttpStatusCode } from '@angular/common/http';
import { CognitoService, IUser} from '../services/cognito.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  loading: boolean;
  user: IUser;
  message:string='';

  constructor(private apiGatewayService: ApiGatewayService) {
    this.loading = false;
    this.user = {} as IUser;
  }

  public ngOnInit(): void {

    this.getMessageFromLambda();
  }

  public getMessageFromLambda(): void {
    this.loading = true;

    this.apiGatewayService.getMessage().subscribe({
      next: (res:any) =>{
        console.log("Msg status ------>",res);
          this.message = res.message;
          console.log("Msg receivd is ------>",this.message);
          this.loading = false;        
      },
      error: (e) => {console.error(e)
        this.loading = false;
      },
      complete: () => console.info('complete') 
  });
  }
}