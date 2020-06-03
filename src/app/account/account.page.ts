import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { IUser } from '../interfaces/user/user';
import { PopOverService } from '../services/pop-over/pop-over.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  providers: [PopOverService]
})
export class AccountPage implements OnInit {

  public user: IUser;

  constructor(private loginService: LoginService, public popOverService: PopOverService) { 
    this.user = {} as IUser;
  }

  public showPopOver(event) {
    this.popOverService.showPopOver(event, popOverTemplate);
  }

  ngOnInit() {
    this.loginService.retreivedLoggedInUser().subscribe(user => {
      this.user.fullName = user.data.fullName;
      this.user.imageFilePath = "../../assets/" + user.data.imageFilePath;
      this.user.emailAddress = user.data.emailAddress;
      this.user.userName = user.data.userName;
      this.user.userPassword = user.data.userPassword;
      this.user.address = user.data.address;
      this.user.contactNumber = user.data.contactNumber;
    })    
  }

}

@Component({
  selector: 'image-popover',
  template: `<ion-list>
              <ion-label color="primary"><ion-icon name="image"></ion-icon>View Image</ion-label>
              <ion-label color="primary"><ion-icon name="camera-reverse"></ion-icon>Update Image</ion-label>
              <ion-label color="primary"><ion-icon name="close"></ion-icon>Delete Image</ion-label>
            </ion-list>`,
  styles: [
    `ion-label {
      display: flex;
      align-items: center;
      padding: 0.5rem;
    }
    ion-icon {
      height: 2rem;
      width: 1.5rem;
      margin-right: 1rem;
    }`
  ],
})

export class popOverTemplate {  
}