import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';


@Component({
  selector: 'bmd-core-app-container',
  template: `
    <nav class="navbar navbar-dark bg-dark flex-md-nowrap p-0">
      <h1 class="navbar-brand col-sm-3 col-md-2 mr-0">Blockchain Market Data</h1>
    </nav>
    <div class="container-fluid c-main">
      <div class="row">
        <nav class="col-md-2 d-none d-md-block bg-light c-sidebar">
          <div class="c-sidebar-sticky">
            <ul class="nav flex-column">
              <li class="nav-item">Exchange Rate</li>
              <li class="nav-item">Statistics</li>
            </ul>
          </div>
        </nav>

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
              <h2>Section title</h2>
          </div>
        </main>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoreAppContainerComponent {

}
