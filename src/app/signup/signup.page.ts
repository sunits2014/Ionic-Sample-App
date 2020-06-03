import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register/register.service';
import { LoadingService } from '../services/loading/loading.service';
import { AlertService } from '../services/alert/alert.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  providers: [RegisterService]
})
export class SignupPage implements OnInit {

  public fullName: string;
  public emailAddress: string;
  public contactNumber: string;
  public userpassword: string;
  public username: string;

  constructor(
    private alert: AlertService, 
    private registerService: RegisterService, 
    private loading: LoadingService,
    private router: Router) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.reset();
        }
      })
  }  

  public register() {
    if (!this.fullName || !this.emailAddress || !this.contactNumber || !this.userpassword || !this.username) {
      this.alert.presentAlert('Alert','All fields are required. Please provide all details to proceed.');
    } else {
      if(!this.emailAddress.includes('@')) {
        this.alert.presentAlert('Alert','The email field requires a proper email address. Please provide one.');
      } else {
        const user = {
          fullName: this.fullName,
          emailAddress: this.emailAddress,
          contactNumber: this.contactNumber,
          userPassword: this.userpassword,
          userName: this.username
        }
        this.loading.present('Please wait...');
        this.registerService.registerUser(user).subscribe(success => {
            this.loading.dismiss();
            this.reset();
            success.response ? this.alert.presentAlert('Alert', success.response) : this.alert.presentAlert('Success','You have registered successfully. Please navigate to the Sign In page and use your credentials.'); 
        }, error => {
          this.loading.dismiss();
          this.reset();
          this.alert.presentAlert('Error','Some unknown error occured. Please try again later.');
        });
      }      
    }
  }

  private reset() {
    this.fullName = '';
    this.emailAddress = '';
    this.contactNumber = '';
    this.userpassword = '';
    this.username = '';
  }

  

  ngOnInit() {
  }

}
