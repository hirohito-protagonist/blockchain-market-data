import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { CoreAppContainerComponent } from './containers/app.container';

import { CoreSidebarViewComponent } from './views/sidebar-view/sidebar.view';
import { CoreContentViewComponent } from './views/content-view/content.view';

import { ExchangeRatesModule } from './../exchange-rates/exchange-rates.module';

export {
  CoreAppContainerComponent
};

import { reducers } from './reducers/index.reducer';

@NgModule({
  imports: [
    CommonModule,
    ExchangeRatesModule,
    StoreModule.forFeature('core', reducers)
  ],
  declarations: [
    CoreAppContainerComponent,
    CoreSidebarViewComponent,
    CoreContentViewComponent
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }
}
