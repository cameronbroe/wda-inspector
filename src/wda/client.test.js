import Client from "./client";
import nock from "nock";

describe('wda.Client', () => {
  it('should create a session with default caps', async () => {
    const scope = nock('http://localhost:8100/')
      .post('/session', { capabilities: {} })
      .reply(200, {
        sessionId: "test-session-id"
      }, {
        "Access-Control-Allow-Origin": "*"
      });

    const wdaClient = new Client();
    await wdaClient.createSession();
    expect(wdaClient.sessionId).toEqual("test-session-id");
    scope.done();
  });

  it('should create a client with a session', async () => {
    const existingClient = Client.fromSessionId('test-existing-session-id');
    expect(existingClient.sessionId).toEqual('test-existing-session-id');
  });

  describe('has a session', () => {
    it('should get the window size', async () => {
      const wdaClient = Client.fromSessionId('test-session-id');

      const expectedSize = {
        width: 400, height: 600
      };

      const scope = nock('http://localhost:8100/')
        .get(`/session/test-session-id/window/size`)
        .reply(200, expectedSize, {
          "Access-Control-Allow-Origin": "*"
        });


      let size = await wdaClient.getWindowSize();
      expect(size).toEqual(expectedSize);
      scope.done();
    });
  });

  describe('does not have a session', () => {
    it('should throw when getting the window size', async () => {
      const wdaClient = new Client();
      await expect(wdaClient.getWindowSize()).rejects.toThrow();
    });
  });
});
