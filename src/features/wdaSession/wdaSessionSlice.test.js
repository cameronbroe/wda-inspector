import wdaSessionSlice, {startSessionSuccess, startSessionFailure, startSession} from "./wdaSessionSlice";
import nock from "nock";
import configureStore from "redux-mock-store";
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('wdaSessionSlice', () => {
  describe('actions', () => {
    it('should set sessionId on a successful session create', () => {
      const sessionId = 'test-session-id';
      const expectedAction = {
        type: 'wdaSession/startSessionSuccess',
        payload: sessionId
      };

      expect(startSessionSuccess(sessionId)).toEqual(expectedAction);
    });

    it('should set an error on a failed session create', () => {
      const error = 'the quick brown fox jumps over the lazy red dog';
      const expectedAction = {
        type: 'wdaSession/startSessionFailure',
        payload: error
      };

      expect(startSessionFailure(error)).toEqual(expectedAction);
    });

    it('should successfully start a session', () => {
      const scope = nock('http://localhost:8100/')
        .post('/session', {capabilities: {}})
        .reply(200, {
          sessionId: "test-session-id"
        }, {
          "Access-Control-Allow-Origin": "*"
        });
      const store = mockStore({});
      return store.dispatch(startSession())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual(startSessionSuccess('test-session-id'));
          scope.done();
        });
    });
  });

  describe('reducer', () => {
    it('should set a sessionId on successful session create', () => {
      const initialState = {
        sessionId: null,
        error: null
      }

      const expectedState = {
        sessionId: 'test-session-id',
        error: null
      }

      const actualState = wdaSessionSlice(initialState, startSessionSuccess('test-session-id'));
      expect(actualState).toEqual(expectedState);
    });

    it('should set an error on a failed session create', () => {
      const initialState = {
        sessionId: null,
        error: null
      }

      const expectedState = {
        sessionId: null,
        error: 'error'
      }

      const actualState = wdaSessionSlice(initialState, startSessionFailure('error'));
      expect(actualState).toEqual(expectedState);
    });
  })
});
