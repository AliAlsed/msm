import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Events } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  friendChat = firebase.database().ref('/friendchats');
  friend: any;
  friendmessages = [];
  fireUser = firebase.database().ref(`users`);
  constructor(public events: Events) {

  }

  initializefriend(friend) {
    this.friend = friend;
  }

  addnewmessage(msg) {
    if (this.friend) {
      var promise = new Promise((resolve, reject) => {
        this.friendChat.child(firebase.auth().currentUser.uid).child('XFR5mVevwAg1GOnwoJy8pnXxkic2').push({
          sentby: firebase.auth().currentUser.uid,
          message: msg,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(() => {
          this.friendChat.child('XFR5mVevwAg1GOnwoJy8pnXxkic2').child(firebase.auth().currentUser.uid).push({
            sentby: firebase.auth().currentUser.uid,
            message: msg,
            timestamp: firebase.database.ServerValue.TIMESTAMP
          }).then(() =>{
            resolve(true);
          })






              })
          })

        return promise;
      }
    }

  getfriendmessages() {
    let temp;
    this.friendChat.child(firebase.auth().currentUser.uid).child('XFR5mVevwAg1GOnwoJy8pnXxkic2').on('value', (snapshot) => {
      this.friendmessages = [];
      temp = snapshot.val();
      for (var tempkey in temp) {
        this.friendmessages.push(temp[tempkey]);
      }
      this.events.publish('newmessage');
    })
  }
  getAdmin() {
    var promise = new Promise((resolve, reject) => {
      this.fireUser.child('XFR5mVevwAg1GOnwoJy8pnXxkic2').once('value', (snapshot) => {
        resolve(snapshot.val());
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }
}
