import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoginService } from '../services/login/login.service';
import { AlertService } from '../services/alert/alert.service';
import { LoadingService } from '../services/loading/loading.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../services/global/global.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
  providers: [LoginService]
})
export class SigninPage implements OnInit {

  public username: string;
  public password: string;

  constructor(
    private alert: AlertService,
    private loading: LoadingService, 
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService) { 
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.reset();
        }
      })
    }

  public login() {
    if (!this.username || !this.password) {
      this.alert.presentAlert('Alert','Either username or password is not provided. Please provide all credentials.');
    } else {
      if (!this.username.includes('@')) {
        this.alert.presentAlert('Alert','The email field requires a proper email address. Please provide one.');
      } else {
        const user = {
          username: this.username,
          password: this.password
        }
        this.loginService.checkLogin(user).subscribe(success => {
          if (success.response) {
            this.alert.presentAlert('Alert',success.response);
            this.reset();
          } else {
            const user = success.fetchedUser;
            this.loading.present('Signing in, please wait..');
            this.loginService.saveLoggedInUser(user).subscribe(data => {
              setTimeout(() => {
                this.router.navigate(['home']);
                this.loading.dismiss();
                this.reset();
              }, 2000)
            });            
          }
        }, error => {
          this.alert.presentAlert('Error', error);
        });
      }      
    }
  }

  private reset() {
    this.username = '';
    this.password = '';
  }

  ngOnInit() {
  }

}
