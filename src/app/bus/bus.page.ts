import { Component, OnInit, Inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FirebaseService } from '../firebase.service';
import { Storage } from '@ionic/storage';
import { NetworkService } from '../network.service';
@Component({
  selector: 'app-bus',
  templateUrl: './bus.page.html',
  styleUrls: ['./bus.page.scss'],
})
export class BusPage implements OnInit {

  busList: Observable<any[]>;
  busData: any;
  fullName: any;
  stage: any;
  constructor(private navCtrl: NavController,
    private firestoreService: FirebaseService,
    public network: NetworkService,
    private storage: Storage, ) {
    this.network.getCurrentNetworkStatus();
    this.storage.get('info').then((val) => {
      this.fullName = val['fullName'];
      this.stage = val['stage'];


      this.busList = this.firestoreService.getFirestoreData2('transList', 'stage', this.stage, 'student', this.fullName);
      this.busList.subscribe(data => {
        this.busData = data;
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
