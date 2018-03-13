import { Component, Input } from '@angular/core';

@Component({
  selector: '<bmd-statistics-view></bmd-statistics-view>',
  template: ` stats data {{ stats | json }}`
})
export class StatisticsViewComponent {

  @Input() stats: any;
}
