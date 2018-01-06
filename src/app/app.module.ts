import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPage } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
// import { HomePage } from '../pages/home/home';
import { AuthLoginProvider } from '../providers/auth/auth';
import { AuthRegisterProvider } from '../providers/auth/auth';
import { DataProvider } from '../providers/data/data';
import { CreateProvider } from '../providers/create/create';
import { LoginProvider } from '../providers/login/login';

@NgModule({
  declarations: [
    MyApp,
    // HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
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
    AuthRegisterProvider
  ]
})
export class AppModule {}
