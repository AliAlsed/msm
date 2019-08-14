

import { Component, OnInit, Inject } from '@angular/core';
import { NavController, ModalController, LoadingController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { ChatService } from '../chat.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  filteredusers: any;
  ngOnInit(): void {
    this.chatservice.getAdmin().then((data) => {
      this.filteredusers = data;
    });
  }
  loaderToShow: any;
  constructor( 
    private navCtrl: NavController, 
    private authService: AuthenticateService,
    public loadingController: LoadingController,
    public chatservice: ChatService,

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

  gotobehavior() { this.showLoader('behavior'); }
  gotoexam() { this.showLoader('exam'); }
  gotoinfo() { this.showLoader('info'); }
  gotoholiday() { this.showLoader('holiday'); }
  gototeacher() { this.showLoader('teacher'); }
  gotochat() { 
    this.chatservice.initializefriend(this.filteredusers);
    this.showLoader('chat'); }
  gotorequest() { this.showLoader('request'); }
}
