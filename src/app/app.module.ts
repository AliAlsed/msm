import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// authen
import { environment } from 'src/environments/environment';
import { AuthenticateService } from './services/authentication.service';
import * as firebase from 'firebase';


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';

//import { AngularFireModule } from '@angular/fire/';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FirestoreSettingsToken } from '@angular/fire/firestore';
//import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FirebaseService } from './firebase.service';
import { StorageServiceModule } from 'angular-webstorage-service';

import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
firebase.initializeApp(environment.firebase);


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
    AuthenticateService,    //authen service
    DatePipe, 
    FirebaseService, 
    AngularFirestore,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
