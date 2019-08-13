import { Component, OnInit, Inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { NetworkService } from '../network.service';
const STORAGE_KEY2 = 'info';
@Component({
  selector: 'app-marks',
  templateUrl: './marks.page.html',
  styleUrls: ['./marks.page.scss'],
})
export class MarksPage implements OnInit {

  markList: Observable<any[]>;
  markData: any;
  fullName: any;
  tag: any;
  constructor(private navCtrl: NavController,
    private firestoreService: FirebaseService,
    public network: NetworkService,
    private storage: Storage, ) {
    this.network.getCurrentNetworkStatus();
    this.storage.get('info').then((val) => {
      this.fullName = val['fullName'];
      this.tag = val['tag'];

      this.markList = this.firestoreService.getFirestoreData2(
        'degreeList', 'tag', this.tag, 'name', this.fullName);
      this.markList.subscribe(data => {
        this.markData = data;
        console.log(data);

      });
    });

  }


  ngOnInit() {

  }


  gotohome() {
    this.navCtrl.navigateForward('/home');
  }

}
