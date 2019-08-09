import { Component, OnInit, Inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FirebaseService } from '../firebase.service';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { NetworkService } from '../network.service';
const STORAGE_KEY2 = 'info';
@Component({
  selector: 'app-bus',
  templateUrl: './bus.page.html',
  styleUrls: ['./bus.page.scss'],
})
export class BusPage implements OnInit {

  busList: Observable<any[]>;
  busData: any;
  constructor(private navCtrl: NavController,
              private firestoreService: FirebaseService,
              public network: NetworkService,
              @Inject(SESSION_STORAGE) private storage: StorageService, ) { }

      ngOnInit() {
        this.network.getCurrentNetworkStatus();
        this.extracttable();
      }
    
      extracttable() {
        this.busList = this.firestoreService.getFirestoreData2(
          'transList', 'stage', this.storage.get(STORAGE_KEY2).stage, 'student', this.storage.get(STORAGE_KEY2).fullName      );
        this.busList.subscribe(data => {
          this.busData = data;
          console.log(data);
  
        });
      }


  gotohome()
  {
      this.navCtrl.navigateForward('/home');
  }

}
