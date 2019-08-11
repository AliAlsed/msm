import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class FcmService {
  constructor(private fcm: FCM,
    private db: AngularFireDatabase) { }

  async getToken(stage: string, division: string, fullName: string) {
    let token = await this.fcm.getToken();
    this.saveToken(token, stage, division, fullName);
  }

  private saveToken(token: string, stage: string, division: string, fullName: string) {
    if (!token) return;
    this.db.list(`studentList/${stage}/${division}/${fullName}`)
      .set('token', token);
  }

  onNotifications() {
    return this.fcm.onNotification();
  }
}
