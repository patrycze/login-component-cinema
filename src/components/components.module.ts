import { NgModule } from '@angular/core';
import { FacebookComponent } from './facebook/facebook';
import { TabsComponent } from './tabs/tabs';
@NgModule({
	declarations: [FacebookComponent,
    TabsComponent,
    TabsComponent],
	imports: [],
	exports: [FacebookComponent,
    TabsComponent,
    TabsComponent]
})
export class ComponentsModule {}
