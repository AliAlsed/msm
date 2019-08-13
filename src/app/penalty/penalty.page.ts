import { Component, OnInit, Inject } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';
import { Observable } from 'rxjs';
import { NetworkService } from '../network.service';
const STORAGE_KEY2 = 'info';
@Component({
  selector: 'app-penalty',
  templateUrl: './penalty.page.html',
  styleUrls: ['./penalty.page.scss'],
})
export class PenaltyPage implements OnInit {

  penList: Observable<any[]>;
  penData: any;
  fullName: any;
  tag: any;
  constructor(private navCtrl: NavController,
    private firestoreService: FirebaseService,
    private network : NetworkService,
    private storage: Storage,) 
      { 
        this.network.getCurrentNetworkStatus();
        this.storage.get('info').then((val) => {
          this.fullName = val['fullName'];
          this.tag = val['tag'];
         
  

        this.penList = this.firestoreService.getFirestoreData2(
          'penaltyList', 'tag', this.tag, 'name', this.fullName);
        this.penList.subscribe(data => {
          this.penData = data;
          console.log(data);
    
    
        });
    
        });
      }

  ngOnInit() {

  }



  gotohome()
  {
      this.navCtrl.navigateForward('/home');
  }

}
