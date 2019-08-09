import { Component, OnInit, Inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';
import { Observable } from 'rxjs';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
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

  constructor(private navCtrl: NavController,
    private firestoreService: FirebaseService,
    public network: NetworkService,
      @Inject(SESSION_STORAGE) private storage: StorageService,) { }

      ngOnInit() {
        this.network.getCurrentNetworkStatus();
        this.extracttable();
      }
    
      extracttable() {
        this.moneyList = this.firestoreService.getFirestoreData2(
          'paymentList', 'tag', this.storage.get(STORAGE_KEY2).tag, 'name', this.storage.get(STORAGE_KEY2).fullName      );
        this.moneyList.subscribe(data => {
          this.moneyData = (data);
          console.log(data);
    
        });
        

      }

  gotohome()
  {
      this.navCtrl.navigateForward('/home');
  }

}
