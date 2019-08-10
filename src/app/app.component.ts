import { Component, Inject } from '@angular/core';
import { Platform, NavController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { FcmService } from './fcm.service';
import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';

const STORAGE_KEY1 = 'local_user';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent{

  constructor(
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private Fcm: FCM,
    private fcm: FcmService,
    public toastController: ToastController,
    private statusBar: StatusBar,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private navCtrl: NavController) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleBlackTranslucent();
      this.splashScreen.hide();
      this.notificationSetup();
    });
  }
  private notificationSetup() {
    this.Fcm.subscribeToTopic('event');
    this.fcm.onNotifications().subscribe(
      (event) => {
        if (this.platform.is('ios')) {
          this.presentToast(event.aps.alert);
        } else {
          this.presentToast(event.body);
        }
      });
  }
  private async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 5000
    });
    toast.present();
  }
}
