import { Component, OnInit, Inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';
import { Observable } from 'rxjs';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
const STORAGE_KEY2 = 'info';
@Component({
  selector: 'app-marks',
  templateUrl: './marks.page.html',
  styleUrls: ['./marks.page.scss'],
})
export class MarksPage implements OnInit {
  
  markList: Observable<any[]>;
  markData: any;

  constructor(private navCtrl: NavController,
    private firestoreService: FirebaseService,
      @Inject(SESSION_STORAGE) private storage: StorageService,) { }


      ngOnInit() {
        this.extracttable();
      }
    
      extracttable() {
        this.markList = this.firestoreService.getFirestoreData2(
          'degreeList', 'tag', this.storage.get(STORAGE_KEY2).tag, 'name', this.storage.get(STORAGE_KEY2).fullName      );
        this.markList.subscribe(data => {
          this.markData = data;
          console.log(data);
  
        });
      }
  gotohome()
  {
      this.navCtrl.navigateForward('/home');
  } 

}
