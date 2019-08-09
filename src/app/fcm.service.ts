import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Firebase } from '@ionic-native/firebase/ngx';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FcmService {
  constructor(private firebase: Firebase,
    private afs: AngularFirestore,
    private platform: Platform) { }

  async getToken(email) {

    let token;

    if (this.platform.is('android')) {
      token = await this.firebase.getToken();
    }

    if (this.platform.is('ios')) {
      token = await this.firebase.getToken();
      await this.firebase.grantPermission();
    }
    this.saveToken(token, email);
  }

  private saveToken(token,email) {
    if (!token) return;
    const devicesRef = this.afs.collection('studentList');

    const data = {
      token
    };

    return devicesRef.doc(email).update({
      'token': token
    });
  }

  onNotifications() {
    return this.firebase.onNotificationOpen();
  }
}
