import { NgModule, ModuleWithProviders } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { CoreAppContainerComponent } from './containers/app.container';

export {
  CoreAppContainerComponent
};

import { reducers } from './reducers/index.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('core', reducers)
  ],
  declarations: [ CoreAppContainerComponent ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }
}
