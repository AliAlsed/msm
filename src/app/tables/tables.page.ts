import { Component, OnInit, Inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
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
  tag: any;
  constructor(private navCtrl: NavController,
    private network : NetworkService,
    private firestoreService: FirebaseService,
    private storage: Storage,) 
      
      { this.network.getCurrentNetworkStatus();
        this.storage.get('info').then((val) => {
          this.tag = val['tag'];


        this.tableList = this.firestoreService.getFirestoreData('weeklyList', 'tag', this.tag);
        this.tableList.subscribe(data => {
          this.tableData = data;
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
