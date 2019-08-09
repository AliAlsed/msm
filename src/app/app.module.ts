import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FirestoreSettingsToken } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';

// authen
import { environment } from '../environments/environment';
import { AuthenticateService } from './services/authentication.service';
import {Network} from '@ionic-native/network/ngx';

import { ReactiveFormsModule } from '@angular/forms';
import { FirebaseService } from './firebase.service';
import { StorageServiceModule } from 'angular-webstorage-service';

import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { FCM } from '@ionic-native/fcm/ngx';
import * as firebase from 'firebase/app';


firebase.initializeApp(environment.firebase)

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    NgxYoutubePlayerModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule, //add
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule , //authen fire and firestore
    StorageServiceModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,

 
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Firebase,
    AuthenticateService,  
    Network, //authen service
    DatePipe, 
    FCM,
    FirebaseService, 
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
