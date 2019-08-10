import { Component, Inject } from '@angular/core';
import { Platform, NavController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { FcmService } from './fcm.service';
import { FCM } from '@ionic-native/fcm/ngx';
const STORAGE_KEY1 = 'local_user';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
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
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.notificationSetup();
      if (this.storage.get(STORAGE_KEY1).email == null) { // if not login
        this.navCtrl.navigateForward('/');

      } else {

        this.navCtrl.navigateForward('/home');
        /* this will also work
         this.navCtrl.goRoot('/app');
        */
      }

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
