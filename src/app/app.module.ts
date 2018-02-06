import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { CoreModule, CoreAppContainerComponent } from './core/core.module';


@NgModule({
  imports: [
    BrowserModule,
    CoreModule
  ],
  bootstrap: [ CoreAppContainerComponent ]
})
export class AppModule { }
