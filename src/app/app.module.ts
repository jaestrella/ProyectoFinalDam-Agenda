import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AddEventPage } from '../pages/add-event/add-event';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SignupPage } from '../pages/signup/signup';
import { ProfilePage } from '../pages/profile/profile';


export const firebaseConfig = {
  apiKey: "AIzaSyAP7amUp-U3I9cT9qFcJ86NfhynOtkxdDo",
  authDomain: "agenda-944b8.firebaseapp.com",
  databaseURL: "https://agenda-944b8.firebaseio.com",
  projectId: "agenda-944b8",
  storageBucket: "",
  messagingSenderId: "709719323977"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AddEventPage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{},{
      links:[
        {component:HomePage,name:'HomePage',segment:'Home'},
        {component:ResetPasswordPage,name:'ResetPasswordPage',segment:'Reset'},
        {component:SignupPage,name:'SignupPage',segment:'Signup'},
      ]
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AddEventPage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Calendar
  ]
})
export class AppModule {}
