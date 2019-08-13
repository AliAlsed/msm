import { Component, OnInit, Inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-homeworks',
  templateUrl: './homeworks.page.html',
  styleUrls: ['./homeworks.page.scss'],
})
export class HomeworksPage implements OnInit {

  homeworkList: Observable<any[]>;
  homeworkData: any;
  tag: any;

  constructor(private navCtrl: NavController,
              private firestoreService: FirebaseService,
              public network: NetworkService,
              private storage: Storage,) { 

                this.network.getCurrentNetworkStatus();
    this.storage.get('info').then((val) => {
      this.tag = val['tag'];
     
      this.homeworkList = this.firestoreService.getFirestoreData('homeworkList', 'tag', this.tag);
      this.homeworkList.subscribe(data => {
        this.homeworkData = data;
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
