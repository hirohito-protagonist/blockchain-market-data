import { fromLayoutActions } from './../actions/index.action';
import { reducer, LayoutView } from './layout.reducer';

describe('Core layout store state', () => {

  describe('undefined action', () => {

    it('should return default state', () => {

      const action = { type: void(0) } as fromLayoutActions.ActionType;

      const result = reducer(void(0), action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('[Core Layout] Change View', () => {

    it('should change active view state', () => {

      const state1 = reducer(void(0), new fromLayoutActions.ChangeView(LayoutView.Statistic));

      expect(state1).toMatchSnapshot();

      const state2 = reducer(state1, new fromLayoutActions.ChangeView(LayoutView.ExchangeRate));

      expect(state2).toMatchSnapshot();
    });
  });
});
