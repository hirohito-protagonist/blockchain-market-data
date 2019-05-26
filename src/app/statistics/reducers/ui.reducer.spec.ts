import { fromUIActions } from './../actions/index.action';
import { reducer } from './ui.reducer';


describe('UI reducer store state', () => {

  describe('undefiend action', () => {

    it('should return default state', () => {

      const action = { type: void(0) } as fromUIActions.ActionType;
      const result = reducer(void(0), action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('[Statistics UI] update ui state', () => {

    it('should not add new property to the store', () => {

      const action = fromUIActions.updateUIState({
        key: 'test', value: 'test'
      });
      const result = reducer(void(0), action);

      expect(result).toMatchSnapshot();
    });

    it('should partial update state for provided key', () => {

      const value1 = { selectedChart: 'test' };
      let action = fromUIActions.updateUIState({
        key: 'chartsView', value: value1
      });
      let result = reducer(void(0), action);

      expect(result).toMatchSnapshot();

      const value2 = { selectedChartTimeSpan: '20days' };
      action = fromUIActions.updateUIState({
        key: 'chartsView', value: value2
      });
      result = reducer(result, action);

      expect(result).toMatchSnapshot();
    });
  });
});
