import { changeView } from './actions';
import { reducer, LayoutView } from './layout.reducer';

describe('Core layout store state', () => {

  describe('undefined action', () => {

    it('should return default state', () => {

      // Given
      const action = { type: void(0) };

      // When
      const result = reducer(void(0), action);

      // Then
      expect(result).toMatchSnapshot();
    });
  });

  describe('[Core Layout] Change View', () => {

    it('should change active view state', () => {

      // Given
      const action1 = changeView({
        view: LayoutView.Statistic
      });
      const action2 = changeView({
        view: LayoutView.ExchangeRate
      });

      // When
      const state1 = reducer(void(0), action1);
      const state2 = reducer(state1, action2);

      // Then
      expect(state1).toMatchSnapshot();
      expect(state2).toMatchSnapshot();
    });
  });
});
