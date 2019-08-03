import { Component , Inject} from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
const STORAGE_KEY1 = 'local_user';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private navCtrl: NavController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

     if(this.storage.get(STORAGE_KEY1).email == null) { // if not login
        this.navCtrl.navigateForward('/');
        
      } else { 
        
        this.navCtrl.navigateForward('/home');
     /* this will also work
      this.navCtrl.goRoot('/app');
     */
     }

    });
  }
}
