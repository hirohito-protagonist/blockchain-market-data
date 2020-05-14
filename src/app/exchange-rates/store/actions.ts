import { createAction, props } from '@ngrx/store';
import { ConvertToBTC } from './../exchange-rates.type';

export const convert = createAction(
  '@exchange-rates/convert',
  props<{ convert: ConvertToBTC }>()
);

export const fetchData = createAction(
  '@exchange-rates/market-prices'
);

export const updateUIState = createAction(
  '@exchange-rates/ui',
  props<{ key: string; value: any }>()
);
