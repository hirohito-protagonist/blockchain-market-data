import { createAction, props, union } from '@ngrx/store';
import { ConvertToBTC } from './../exchange-rates.type';

export const convert = createAction(
  '[Exchange Rates Feature] Convert to BTC',
  props<{ convert: ConvertToBTC }>()
);
