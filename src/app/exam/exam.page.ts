import { Component, OnInit, Inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.page.html',
  styleUrls: ['./exam.page.scss'],
})
export class ExamPage implements OnInit {

  examList: Observable<any[]>;
  examData: any;
  tag: any;
  constructor(private navCtrl: NavController,
    private firestoreService: FirebaseService,
    private storage: Storage,public network: NetworkService) 
    { 
        this.network.getCurrentNetworkStatus();
    this.storage.get('info').then((val) => {
      this.tag = val['tag'];
     

    this. examList = this.firestoreService.getFirestoreData(
      'examList', 'tag', this.tag  );
    this. examList.subscribe(data => {
      this. examData = data;
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
