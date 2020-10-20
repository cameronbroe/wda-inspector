import './screenStreamSlice';
import nock from "nock";
import configureStore from "redux-mock-store";
import thunk from 'redux-thunk';
import screenSessionSlice, {
  screenSessionFailure,
  screenSessionStarted,
  startScreenSession
} from "./screenStreamSlice";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('screenSessionSlice', () => {
  describe('actions', () => {
    it('should set stream dimensions', () => {
      const dimensions = {
        width: 400,
        height: 600
      }
      const expectedAction = {
        type: 'screenSession/screenSessionStarted',
        payload: dimensions
      };

      expect(screenSessionStarted(dimensions)).toEqual(expectedAction);
    });

    it('should set an error on a failed session create', () => {
      const error = 'the quick brown fox jumps over the lazy red dog';
      const expectedAction = {
        type: 'screenSession/screenSessionFailure',
        payload: error
      };

      expect(screenSessionFailure(error)).toEqual(expectedAction);
    });

    it('should successfully start a screen stream session', () => {
      const dimensions = {
        width: 400,
        height: 600
      }
      const scope = nock('http://localhost:8100/')
        .get('/session/test-session-id/window/size')
        .reply(200, {
          ...dimensions
        }, {
          "Access-Control-Allow-Origin": "*"
        });
      const store = mockStore({
        wdaSession: {
          sessionId: 'test-session-id'
        }
      });
      return store.dispatch(startScreenSession())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual(screenSessionStarted(dimensions));
          scope.done();
        });
    });
  });

  describe('reducer', () => {
    it('should set a sessionId on successful session create', () => {
      const initialState = {
        width: 0,
        height: 0,
        error: null
      }

      const dimensions = {
        width: 400,
        height: 600
      }

      const expectedState = {
        ...dimensions,
        error: null
      }

      const actualState = screenSessionSlice(initialState, screenSessionStarted(dimensions));
      expect(actualState).toEqual(expectedState);
    });

    it('should set an error on a failed session create', () => {
      const initialState = {
        width: 0,
        height: 0,
        error: null
      }

      const expectedState = {
        width: 0,
        height: 0,
        error: 'error'
      }

      const actualState = screenSessionSlice(initialState, screenSessionFailure('error'));
      expect(actualState).toEqual(expectedState);
    });
  });
});
