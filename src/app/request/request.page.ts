import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {
  firerequest = firebase.database().ref('request');
 type = '';
 count = 0;
 reason = '';

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  gotohome()
  {
      this.navCtrl.navigateForward('/home');
  }
  add(type,count,reason){
    this.firerequest.child(firebase.auth().currentUser.uid).set({
      type:type,
      count:count,
      reason:reason
    });
  }

}
