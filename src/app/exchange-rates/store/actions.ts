import { createAction, props } from '@ngrx/store';
import { ConvertToBTC } from './../exchange-rates.type';

export const convert = createAction(
  '[Exchange Rates Feature] Convert to BTC',
  props<{ convert: ConvertToBTC }>()
);

export const fetchData = createAction(
  '[Exchange Rates Feature] Market prices fetch data'
);

export const updateUIState = createAction(
  '[Exchange Rates Feature] Update UI state',
  props<{ key: string; value: any }>()
);
