import { Component, OnInit, Inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';
import { Observable } from 'rxjs';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { NetworkService } from '../network.service';
const STORAGE_KEY2 = 'info';
@Component({
  selector: 'app-absent',
  templateUrl: './absent.page.html',
  styleUrls: ['./absent.page.scss'],
})
export class AbsentPage implements OnInit {
  absentList: Observable<any[]>;
  absentData: any;

  constructor(private navCtrl: NavController,
              private firestoreService: FirebaseService,
              @Inject(SESSION_STORAGE) private storage: StorageService,
              public network: NetworkService

      ) { }

  ngOnInit() {
    this.network.getCurrentNetworkStatus();
    this.extracttable();
  }

  extracttable() {
    this.absentList = this.firestoreService.getFirestoreData2(
      'absentList', 'tag', this.storage.get(STORAGE_KEY2).tag, 'name', this.storage.get(STORAGE_KEY2).fullName      );
    this.absentList.subscribe(data => {
      this.absentData = data;
      console.log(data);


    });
  }

  gotohome()
  {
      this.navCtrl.navigateForward('/home');
  }

}
