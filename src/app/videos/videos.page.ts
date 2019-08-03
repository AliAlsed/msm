import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {

   videosList: Observable<any[]>;
   videosData: any;
    constructor(private navCtrl: NavController,
      private firestoreService: FirebaseService,) { }
  
    ngOnInit() {
      this.videosList = this.firestoreService.getFirestoreData('videosList');
    }
  
    ngAfterViewInit() {
      this.videosList.subscribe(data => {
        this.videosData = data;
      });
    }


    youtube_parser(url) {
      var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      var match = url.match(regExp);
      if (match && match[2].length == 11) {
        return match[2];
      }
    }
  


  gotohome()
  {

      this.navCtrl.navigateForward('/home');
    

  }

}
