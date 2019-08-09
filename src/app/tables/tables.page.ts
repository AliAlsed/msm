import { Component, OnInit, Inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';
import { Observable } from 'rxjs';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { NetworkService } from '../network.service';
const STORAGE_KEY2 = 'info';
@Component({
  selector: 'app-tables',
  templateUrl: './tables.page.html',
  styleUrls: ['./tables.page.scss'],
})
export class TablesPage implements OnInit {
  tableList: Observable<any[]>;
  tableData: any;

  constructor(private navCtrl: NavController,
    private network : NetworkService,
    private firestoreService: FirebaseService,
      @Inject(SESSION_STORAGE) private storage: StorageService,) { }

  ngOnInit() {
    this.network.getCurrentNetworkStatus();
    this.extracttable();
  }


  extracttable() {
    this.tableList = this.firestoreService.getFirestoreData('weeklyList', 'tag', this.storage.get(STORAGE_KEY2).tag);
    this.tableList.subscribe(data => {
      this.tableData = data;
      console.log(data);
    });
  }


  gotohome()
  {
      this.navCtrl.navigateForward('/home');
  }

}
