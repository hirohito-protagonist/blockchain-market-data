import { updateUIState } from './actions';
import { reducer } from './ui.reducer';


describe('UI reducer store state', () => {

  describe('undefiend action', () => {

    it('should return default state', () => {

      // Given
      const action = { type: void(0) };

      // When
      const result = reducer(void(0), action);

      // Then
      expect(result).toMatchSnapshot();
    });
  });

  describe('[Statistics UI] update ui state', () => {

    it('should not add new property to the store', () => {

      // Given
      const action = updateUIState({
        key: 'test', value: 'test'
      });

      // When
      const result = reducer(void(0), action);

      // Then
      expect(result).toMatchSnapshot();
    });

    it('should partial update state for provided key', () => {

      // Given
      const changeChartViewAction1 = updateUIState({
        key: 'chartsView', value: { selectedChart: 'test' }
      });

      const changeChartViewAction2 = updateUIState({
        key: 'chartsView', value: { selectedChartTimeSpan: '20days' }
      });

      // When
      const state1 = reducer(void(0), changeChartViewAction1);
      const state2 = reducer(state1, changeChartViewAction2);

      // Then
      expect(state1).toMatchSnapshot();
      expect(state2).toMatchSnapshot();
    });
  });
});
