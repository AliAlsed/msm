import { Component, OnInit, Inject } from '@angular/core';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
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

  constructor(private navCtrl: NavController,
    private firestoreService: FirebaseService,
    private network : NetworkService,
      @Inject(SESSION_STORAGE) private storage: StorageService,) { }

  ngOnInit() {
    this.network.getCurrentNetworkStatus();
    this.extracttable();
  }

  extracttable() {
    this.penList = this.firestoreService.getFirestoreData2(
      'penaltyList', 'tag', this.storage.get(STORAGE_KEY2).tag, 'name', this.storage.get(STORAGE_KEY2).fullName      );
    this.penList.subscribe(data => {
      this.penData = data;
      console.log(data);


    });
  }

  gotohome()
  {
      this.navCtrl.navigateForward('/home');
  }

}
