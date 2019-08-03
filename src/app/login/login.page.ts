
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController, LoadingController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';

import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { FirebaseService } from '../firebase.service';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
const STORAGE_KEY1 = 'local_user';
const STORAGE_KEY2 = 'info';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  profile: Observable<any>;
  
  validations_form: FormGroup;
  errorMessage: string = '';
  constructor(

    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private firestoreService: FirebaseService,
    private router: Router,


  ) { }

  ngOnInit() {

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
    this.profile= this.firestoreService.getmyprofileDetail('studentList',this.storage.get(STORAGE_KEY1).email).valueChanges();
    this.profile.subscribe(data => {
      this.storage.set(STORAGE_KEY2, data);                             // store inforamation of student
    });
  }
  loginUser(value){
    if (value.email != "admin@admin.com"){
    console.log(value.email);
    this.authService.loginUser(value).then(res => {
       this.storage.set(STORAGE_KEY1, this.authService.userDetails());
       this.savedata();
      console.log(this.authService.userDetails());
       this.errorMessage = "";
       this.navCtrl.navigateForward('/home');
      // this.router.navigate(['home']);
     }, err => {
       this.errorMessage = err.message;
     })
    }
    }
      

}