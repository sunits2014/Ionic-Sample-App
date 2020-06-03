import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PopOverService {

  private currentPopover: any;

  constructor(private popoverController: PopoverController) { }

  public async showPopOver(ev, component) {
    const popover = await this.popoverController.create({
      component: component,
      event: ev,
      translucent: true
    });
    this.currentPopover = popover;
    return popover.present();
  }

  public dismissPopover() {
    if (this.currentPopover) {
      this.currentPopover.dismiss().then(() => { this.currentPopover = null; });
    }
  }
}

