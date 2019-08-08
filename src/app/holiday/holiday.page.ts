import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.page.html',
  styleUrls: ['./holiday.page.scss'],
})
export class HolidayPage implements OnInit {

  holidayList: Observable<any[]>;
  holidayData: any;
  constructor(private navCtrl: NavController,
    private firestoreService: FirebaseService,) { }

  ngOnInit() {
    this.holidayList = this.firestoreService.getFirestoreData('holidayList');
  }

  ngAfterViewInit() {
    this.holidayList.subscribe(data => {
      this.holidayData = data;
    });
  }

  

  gotohome()
  {
      this.navCtrl.navigateForward('/home');
  }

}
