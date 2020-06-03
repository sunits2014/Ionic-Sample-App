import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global/global.service';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  public imagePath: string;
  public username: string;

  constructor(
    private menuController: MenuController,
    private router: Router,
    private globalService: GlobalService,
    private loginService: LoginService) { }

  public async openMenu() {
    await this.menuController.open();
  }

  public goTo(destination) {
    switch (destination) {
      case 'account':
        this.router.navigate(['account']);
        break;
      case 'logout':
        this.loginService.clearUserCache().subscribe(data => {
          this.router.navigate(['']);
        });
        break;
    }
  }

  ngOnInit() {
    this.loginService.retreivedLoggedInUser().subscribe(user => {
      user.data.imageFilePath ? this.imagePath = '../../assets/' + user.data.imageFilePath : this.imagePath = '../../assets/images/userImages/normal.svg';
      this.username = user.data.userName;
    })    
  }

}
