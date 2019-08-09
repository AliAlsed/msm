import { Injectable } from "@angular/core";
import * as firebase from 'firebase/app';
import { FCM } from '@ionic-native/fcm/ngx';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { FcmService } from '../fcm.service';
 
@Injectable()
export class AuthenticateService {
  // this.todoCollectionRef = this.afs.collection('todos');

constructor(private afs: AngularFirestore,
   private fcm: FcmService){}
 
  registerUser(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
     .then(    
       res => resolve(res),
       err => reject(err))
   }).then(()=>{
    // this.addToken();
   });
  }
 
  loginUser(value){
    let mymail = value.email;
    return new Promise<any>((resolve, reject) => {
     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))

   }).then(()=>{
    this.addToken( mymail );
   });

  }
 
  logoutUser(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        firebase.auth().signOut()
        .then(() => {
          console.log("LOG Out");
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }
 
  userDetails(){
    return firebase.auth().currentUser;
  }

  addToken(mail:string){
    // this.fcm.getToken().then((token) => {
    //   console.log(token);
    //   // this.db.list(`token/${firebase.auth().currentUser.uid}`).set('token', token);
    //   return this.afs.collection('studentList').doc(mail).update({'token': token});

    // });
    this.fcm.getToken(mail);
  }
}