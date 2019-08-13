import { Component, OnInit, Inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';
import { Observable } from 'rxjs';
import { NetworkService } from '../network.service';

import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-absent',
  templateUrl: './absent.page.html',
  styleUrls: ['./absent.page.scss'],
})
export class AbsentPage  {
  absentList: Observable<any[]>;
  absentData: any;
  fullName: any;
  tag: any;
  constructor(private navCtrl: NavController,
    private firestoreService: FirebaseService,
    private storage: Storage,
    public network: NetworkService

  ) {
    this.network.getCurrentNetworkStatus();
    this.storage.get('info').then((val) => {
      this.fullName = val['fullName'];
      this.tag = val['tag'];
      this.absentList = this.firestoreService.getFirestoreData2('absentList', 'tag', this.tag, 'name', this.fullName);
      this.absentList.subscribe(data => {
        this.absentData = data;
        console.log(data);
    });

    });
  }



  gotohome() {
    this.navCtrl.navigateForward('/home');
  }

}
