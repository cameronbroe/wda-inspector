const baseUrl = `http://localhost:8100`

export const createSession = async (caps = {}) => {
  const res = await fetch(`${baseUrl}/session`, {
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
  return body.sessionId;
};

export const getWindowSize = async (sessionId) => {
  const res = await fetch(`${baseUrl}/session/${sessionId}/window/size`);
  return await res.json();
}

export const getElementTree = async () => {
  const res = await fetch(`${baseUrl}/source?format=json`);
  return await res.json();
}
