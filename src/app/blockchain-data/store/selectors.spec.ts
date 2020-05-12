import {
  getServiceDataNode,
  lastUpdate,
  response
} from './selectors';
import { reducers } from './store';
import { DataServiceType } from './../blockchain-data.type';


describe('Selectors', () => {

  let store;

  beforeEach(() => {

    store = {
      'blockchain-data': {
        data: reducers.data(void(0), {} as any),
        version: reducers.version()
      }
    };

  });

  it('should pick data service node', () => {

    expect(getServiceDataNode(DataServiceType.ToBTC)(store)).toMatchSnapshot();
  });

  it('should pick lastUpdate information for provided data service', () => {

    expect(lastUpdate(DataServiceType.ToBTC)(store)).toMatchSnapshot();
  });

  it('should pick response information for provided data service', () => {

    expect(response(DataServiceType.ToBTC)(store)).toMatchSnapshot();
  });
});
