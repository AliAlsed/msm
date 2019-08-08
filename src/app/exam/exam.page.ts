import { Component, OnInit, Inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';
import { Observable } from 'rxjs';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';

const STORAGE_KEY2 = 'info';
@Component({
  selector: 'app-exam',
  templateUrl: './exam.page.html',
  styleUrls: ['./exam.page.scss'],
})
export class ExamPage implements OnInit {

  examList: Observable<any[]>;
  examData: any;

  constructor(private navCtrl: NavController,
    private firestoreService: FirebaseService,
      @Inject(SESSION_STORAGE) private storage: StorageService,) { }

  ngOnInit() {
    this.extracttable();
  }

  extracttable() {
    this. examList = this.firestoreService.getFirestoreData(
      'examList', 'tag', this.storage.get(STORAGE_KEY2).tag     );
    this. examList.subscribe(data => {
      this. examData = data;
      console.log(data);


    });
  }

  gotohome()
  {
      this.navCtrl.navigateForward('/home');
  }

}
