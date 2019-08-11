import { Component, OnInit, Inject } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { profile } from '../model/profile.interface';
import { NetworkService } from '../network.service';
const STORAGE_KEY1 = 'local_user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private firestoreService: FirebaseService,
    private navCtrl: NavController,
    private network: NetworkService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
  ) { }

  spinners: any;

  myprofileList: Observable<any[]>;

  profile: Observable<profile>;
  myprofileData: any;
  temp: any;

  ngOnInit() {
    this.network.getCurrentNetworkStatus();
    //const songId: string = this.route.snapshot.paramMap.get('id');
    this.profile = this.firestoreService.getmyprofileDetail('studentList', this.storage.get(STORAGE_KEY1).email).valueChanges();
  }

  ngAfterViewInit() {
    this.profile.subscribe(data => {
      this.myprofileData = data;
      this.myprofileData = Array.of(this.myprofileData);              ///solution 
    });
  }

  gotohome() {
    this.navCtrl.navigateForward('/home');
  }
}
