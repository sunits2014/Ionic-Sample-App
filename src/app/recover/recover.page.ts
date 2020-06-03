import { Component, OnInit, OnDestroy } from '@angular/core';
import { isObject } from 'util';
import { AlertService } from '../services/alert/alert.service';
import { LoginService } from '../services/login/login.service';
import { ToastService } from '../services/toast/toast.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
  providers: [LoginService]
})
export class RecoverPage implements OnInit, OnDestroy {

  public retreivedPassword: string;
  public emailAddress: string;

  constructor(
    private alertService: AlertService,
    private loginService: LoginService,
    private toastService: ToastService,
    private router: Router) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.emailAddress = '';
        }
      })
  }

  public retreivePassword() {
    if (this.emailAddress) {
      if (!this.emailAddress.includes('@')) {
        this.alertService.presentAlert('Alert', 'Please enter a valid email address.')
      } else {
        const queryItem = {
          emailAddress: this.emailAddress
        }
        this.loginService.recover(queryItem).subscribe(response => {
          if (response.status) {
            this.alertService.presentAlert('Alert', response.statusText)
          } else {
            this.toastService.presentToastWithOptions('Your password is: ' + response.response.userPassword);
          }
        })
      }      
    } else if (!this.emailAddress || !this.emailAddress.includes('@')){
      this.alertService.presentAlert('Alert', 'Please enter a valid email address.')
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.emailAddress = '';
  }

}
