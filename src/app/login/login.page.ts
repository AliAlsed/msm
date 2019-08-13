
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';

import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { FirebaseService } from '../firebase.service';

import { ToastController } from '@ionic/angular';
import { NetworkService } from '../network.service';
import { profile } from '../model/profile.interface';
import { AngularFireDatabase } from '@angular/fire/database';
import { FcmService } from '../fcm.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  profile: Observable<profile>;
  validations_form: FormGroup;
  errorMessage: string = '';
  logData: profile ;
  constructor(

    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    private db: AngularFireDatabase,
    private storage: Storage,
    private firestoreService: FirebaseService,
    private router: Router,
    public toastController: ToastController,
    public network: NetworkService,
    private fcm: FcmService
  ) { }

  ngOnInit() {
    this.network.getCurrentNetworkStatus();
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  

  validation_messages = {
    'email': [
      { type: 'required', message: 'يجب ادخال البريد الألكتروني' },
      { type: 'pattern', message: 'الايميل غير صحيح' }
    ],
    'password': [
      { type: 'required', message: 'يجب ادخال كلمه السر الصحيحة' },
      { type: 'minlength', message: 'كلمه السر يجب ان تكون على الاقل خمس احرف' }
    ]
  };
 
  savedata()
  {

  }
  loginUser(value){
    if (value.email != "admin@admin.com"){
   
    this.authService.loginUser(value).then(res => {
       this.profile= this.firestoreService.getmyprofileDetail('studentList',value.email).valueChanges();
       this.profile.subscribe(data => {
       
         this.storage.set('info', data);   // store inforamation of student
         //console.log(data['fullName']);  
         this.fcm.getToken(data['stage'],data['division'],data['fullName']);
       });
     
       this.navCtrl.navigateForward('/home');
      // this.router.navigate(['home']);
     }, err => {
      //  this.errorMessage = err.message;
      this.presentToast();
     })
    }
    }

    
    async presentToast() {
      const toast = await this.toastController.create({
        message: ' معلومات المستخدم غير صحيحه',
        cssClass: 'mytoast',
        duration: 2000
      });
      toast.present();
    }

}