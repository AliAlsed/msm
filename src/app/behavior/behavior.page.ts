import { Component, OnInit, Inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';
import { Observable } from 'rxjs';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';

const STORAGE_KEY2 = 'info';

@Component({
  selector: 'app-behavior',
  templateUrl: './behavior.page.html',
  styleUrls: ['./behavior.page.scss'],
})
export class BehaviorPage implements OnInit {

  bahaviorList: Observable<any[]>;
  bahaviorData: any;

  constructor(private navCtrl: NavController,
    private firestoreService: FirebaseService,
      @Inject(SESSION_STORAGE) private storage: StorageService,) { }

  ngOnInit() {
    this.extracttable();
  }

  extracttable() {
    this. bahaviorList = this.firestoreService.getFirestoreData2(
      'attitudeList', 'tag', this.storage.get(STORAGE_KEY2).tag, 'name', this.storage.get(STORAGE_KEY2).fullName      );
    this. bahaviorList.subscribe(data => {
      this. bahaviorData = data;
      console.log(data);


    });
  }

  gotohome()
  {
      this.navCtrl.navigateForward('/home');
  }

}
