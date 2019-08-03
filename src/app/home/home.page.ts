

import { Component, OnInit, Inject } from '@angular/core';
import { NavController, ModalController, LoadingController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
const STORAGE_KEY1 = 'local_user';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loaderToShow: any;
  constructor( private navCtrl: NavController, 
    private authService: AuthenticateService,
    public loadingController: LoadingController,
    @Inject(SESSION_STORAGE) private storage: StorageService,
  ) {
    
    }


  logout(){
    
    this.navCtrl.navigateForward('/');
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    })
    
  }


  showLoader(location) {
     this.loadingController.create({
      spinner: 'lines',
      duration: 2000,
      message: 'الرجاء الانتظار',
      translucent: true,
    }).then((res) => {
      this.loaderToShow=res;
      this.loaderToShow.present();
    });
    
    setTimeout(() => {
     
      this.loaderToShow.dismiss();
      this.navCtrl.navigateForward(location);
    }, 2000);
    
  }
  


  gotoprofile() { this.showLoader('profile'); }  //console.log(this.authService.userDetails());        
  gotonews() { this.showLoader('news'); }
  gotomarks() { this.showLoader('marks'); }
  gotoabsent() { this.showLoader('absent'); }
  gotonotification() { this.showLoader('notification'); }
  gototables() { this.showLoader('tables'); }
  gotohomeworks() { this.showLoader('homeworks'); }
  gotomoney() { this.showLoader('money'); }
  gotovideos() { this.showLoader('videos'); }
  gotobus() { this.showLoader('bus'); }
  gotopenalty() { this.showLoader('penalty'); }

}
