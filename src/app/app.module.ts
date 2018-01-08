import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPage } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from  'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthLoginProvider } from '../providers/auth/auth';
import { AuthRegisterProvider } from '../providers/auth/auth';
import { DataProvider } from '../providers/data/data';
import { CreateProvider } from '../providers/create/create';
import { LoginProvider } from '../providers/login/login';
import { FacebookComponent } from '../components/facebook/facebook';
import { ImdbProvider } from '../providers/imdb/imdb';
// import { CinemasPage } from '../pages/cinemas/cinemas';
// import { RecomendedPage } from '../pages/recomended/recomended';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

const fire = {
  apiKey: "AIzaSyDXZyIlRxdvROsWDYzgCPC4Xtv0SsH89yo",
  authDomain: "facebook-login-bb4a7.firebaseapp.com",
  databaseURL: "https://facebook-login-bb4a7.firebaseio.com",
  projectId: "facebook-login-bb4a7",
  storageBucket: "facebook-login-bb4a7.appspot.com",
  messagingSenderId: "278638417906"
}

@NgModule({
  declarations: [
    MyApp,
    // HomePage
    // RecomendedPage,
    // CinemasPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(fire),
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    // RecomendedPage,
    // CinemasPage,
    MyApp
    // HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthLoginProvider,
    DataProvider,
    CreateProvider,
    LoginProvider,
    AuthRegisterProvider,
    AngularFireAuth,
    FacebookComponent,
    ImdbProvider,
    HttpClient
    
  ]
})
export class AppModule {}
