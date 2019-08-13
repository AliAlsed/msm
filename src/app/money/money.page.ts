import { Component, OnInit, Inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { NetworkService } from '../network.service';
const STORAGE_KEY2 = 'info';
@Component({
  selector: 'app-money',
  templateUrl: './money.page.html',
  styleUrls: ['./money.page.scss'],
})
export class MoneyPage implements OnInit {
  moneyList: Observable<any>;
  moneyData: any;

  payList: Observable<any>;
  payData: any;
  fullName: any;
  tag: any;
  constructor(private navCtrl: NavController,
    private firestoreService: FirebaseService,
    public network: NetworkService,
    private storage: Storage,) 
      {
        this.network.getCurrentNetworkStatus();
        this.storage.get('info').then((val) => {
          this.fullName = val['fullName'];
          this.tag = val['tag'];
         
  


        this.moneyList = this.firestoreService.getFirestoreData2(
          'paymentList', 'tag', this.tag, 'name', this.fullName);
        this.moneyList.subscribe(data => {
          this.moneyData = (data);
          console.log(data);
    
        });

        this.payList = this.firestoreService.getFirestoreData2(
          'payList', 'tag', this.tag, 'name', this.fullName);
        this.payList.subscribe(data => {
          this.payData = (data);
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
