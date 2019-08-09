import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Firebase } from '@ionic-native/firebase/ngx';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FcmService {
  constructor(private firebase: Firebase,
              private db: AngularFireDatabase,
              private platform: Platform) { }

  async getToken(stage,division,fullName) {

    let token;

    if (this.platform.is('android')) {
      token = await this.firebase.getToken();
    }

    if (this.platform.is('ios')) {
      token = await this.firebase.getToken();
      await this.firebase.grantPermission();
    }
    this.saveToken(token, stage, division, fullName);
  }

  private saveToken(token,stage,division,fullName) {
    if (!token) return;

    const data = {
      token
    };
    this.db.list(`studentList/${stage}/${division}/${fullName}`)
    .set('token', token);
  }

  onNotifications() {
    return this.firebase.onNotificationOpen();
  }
}
