import { Component, OnInit, Inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { Observable } from 'rxjs';
import { NetworkService } from '../network.service';
const STORAGE_KEY2 = 'info';

@Component({
  selector: 'app-homeworks',
  templateUrl: './homeworks.page.html',
  styleUrls: ['./homeworks.page.scss'],
})
export class HomeworksPage implements OnInit {

  homeworkList: Observable<any[]>;
  homeworkData: any;


  constructor(private navCtrl: NavController,
              private firestoreService: FirebaseService,
              public network: NetworkService,
              @Inject(SESSION_STORAGE) private storage: StorageService,) { }

  ngOnInit() {
    this.network.getCurrentNetworkStatus();
    console.log( this.storage.get(STORAGE_KEY2).tag);         //  retrive the information of user
    this.extracthomework();
  }


  extracthomework() {
    this.homeworkList = this.firestoreService.getFirestoreData('homeworkList', 'tag', this.storage.get(STORAGE_KEY2).tag);
    this.homeworkList.subscribe(data => {
      this.homeworkData = data;
      console.log(data);
    });
  }



  gotohome()
  {
      this.navCtrl.navigateForward('/home');
  }

}
