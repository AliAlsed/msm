import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  infoList: Observable<any[]>;
  infoData: any;
  constructor(private navCtrl: NavController,
    private firestoreService: FirebaseService,) { }

  ngOnInit() {
    this.infoList = this.firestoreService.getFirestoreData('historylist');
  }

  ngAfterViewInit() {
    this.infoList.subscribe(data => {
      this.infoData = data;
    });
  }

  

  gotohome()
  {
      this.navCtrl.navigateForward('/home');
  }

}
