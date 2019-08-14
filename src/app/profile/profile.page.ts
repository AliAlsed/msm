import { Component, OnInit, Inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NetworkService } from '../network.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit  {
  

  myprofileData: any;

  constructor(
    private navCtrl: NavController,
    private network: NetworkService,
    private storage: Storage,
  ) 
  { 
   
  }

  ngOnInit() {
    this.network.getCurrentNetworkStatus();
    this.storage.get('info').then((val) => {
      this.myprofileData = Array.of(val); 
    });
  }

  gotohome() {
    this.navCtrl.navigateForward('/home');
  }
}
