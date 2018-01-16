import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetLocationPage } from './set-location';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

@NgModule({
  declarations: [
    SetLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(SetLocationPage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDxTO3Ou0s-LTGWqQXDdpxbQPfuTp86pew'
    }),
    AgmSnazzyInfoWindowModule
    
  ],
})
export class SetLocationPageModule {}
