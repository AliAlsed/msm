import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.page.html',
  styleUrls: ['./teacher.page.scss'],
})
export class TeacherPage implements OnInit {
  teacherList: Observable<any[]>;
  teacherData: any;
  constructor(private navCtrl: NavController,
    private firestoreService: FirebaseService,) { }

  ngOnInit() {
    this.teacherList = this.firestoreService.getFirestoreData('stafflist');
  }

  ngAfterViewInit() {
    this.teacherList.subscribe(data => {
      this.teacherData = data;
    });
  }

  

  gotohome()
  {
      this.navCtrl.navigateForward('/home');
  }

}
