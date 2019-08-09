import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';
import { Observable } from 'rxjs';
import { NetworkService } from '../network.service';
@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  newsList: Observable<any[]>;
  newsData: any;
  constructor(private navCtrl: NavController,
    private network: NetworkService,
    private firestoreService: FirebaseService,) { }

  ngOnInit() {
    this.network.getCurrentNetworkStatus();
    this.newsList = this.firestoreService.getFirestoreData('newsList');
  }

  ngAfterViewInit() {
    this.newsList.subscribe(data => {
      this.newsData = data;
    });
  }

  substringText(text): any {
    return new DOMParser().parseFromString(text, "text/html").documentElement.textContent;   //documentElement.textContent.substring(0, 1000)
  }

  gotohome()
  {
      this.navCtrl.navigateForward('/home');
  }

}
