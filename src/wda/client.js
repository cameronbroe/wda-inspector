export default class Client {
  constructor(baseUrl = `http://localhost:8100`) {
    this.baseUrl = new URL("/", baseUrl);
    this.sessionId = "";
  }

  static fromSessionId(sessionId, baseUrl = `http://localhost:8100`) {
    let client = new Client(baseUrl);
    client.sessionId = sessionId;
    return client;
  }

  __resolvedUrl(path) {
    return new URL(path, this.baseUrl).toString();
  }

  __resolvedSessionUrl(path) {
    return new URL(`/session/${this.sessionId}${path}`, this.baseUrl).toString();
  }

  async createSession(caps = {}) {
    const res = await fetch(this.__resolvedUrl("/session"), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "capabilities": {
          ...caps
        }
      })
    });
    const body = await res.json();
    this.sessionId = body.sessionId;
    return this.sessionId;
  }

  async getWindowSize() {
    if(!!this.sessionId) {
      const res = await fetch(this.__resolvedSessionUrl('/window/size'));
      return await res.json();
    } else {
      console.log('no sessionId');
      throw new Error('need a session ID to get the window size');
    }
  }
}

