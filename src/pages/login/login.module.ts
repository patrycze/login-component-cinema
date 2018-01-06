import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { FacebookComponent } from '../../components/facebook/facebook';
@NgModule({
  declarations: [
    LoginPage,
    FacebookComponent
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
})
export class LoginPageModule {}
