import nock from "nock";
import { createSession, getWindowSize, getElementTree } from "./wdaApi";

describe('wdaAPI', () => {
  it('should create a session with default caps', async () => {
    const scope = nock('http://localhost:8100/')
      .post('/session', {capabilities: {}})
      .reply(200, {
        sessionId: "test-session-id"
      }, {
        "Access-Control-Allow-Origin": "*"
      });

    const sessionId = await createSession();
    expect(sessionId).toEqual("test-session-id");
    scope.done();
  });

  it('should get the window size', async () => {
    const expectedSize = {
      width: 400, height: 600
    };

    const scope = nock('http://localhost:8100/')
      .get(`/session/test-session-id/window/size`)
      .reply(200, expectedSize, {
        "Access-Control-Allow-Origin": "*"
      });


    let size = await getWindowSize('test-session-id');
    expect(size).toEqual(expectedSize);
    scope.done();
  });

  it('should get the element tree', async () => {
    const expectedTree = {
      value: {}
    }

    const scope = nock('http://localhost:8100/')
      .get('/source?format=json')
      .reply(200, expectedTree, {
        "Access-Control-Allow-Origin": "*"
      });

    let tree = await getElementTree();
    expect(tree).toEqual(expectedTree);
    scope.done();
  });
});
