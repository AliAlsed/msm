import { Component, OnInit, Inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-behavior',
  templateUrl: './behavior.page.html',
  styleUrls: ['./behavior.page.scss'],
})
export class BehaviorPage implements OnInit {

  bahaviorList: Observable<any[]>;
  bahaviorData: any;
  fullName: any;
  tag: any;
  constructor(private navCtrl: NavController,
    private firestoreService: FirebaseService,
    private storage: Storage,
    public network: NetworkService) 
    {
      this.network.getCurrentNetworkStatus();
    this.storage.get('info').then((val) => {
      this.fullName = val['fullName'];
      this.tag = val['tag'];
     

        this. bahaviorList = this.firestoreService.getFirestoreData2('attitudeList', 'tag', this.tag, 'name', this.fullName);
        this. bahaviorList.subscribe(data => {
          this. bahaviorData = data;
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
