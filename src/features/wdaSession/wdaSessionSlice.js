import { createSlice } from "@reduxjs/toolkit";
import { createSession } from "../../api/wdaApi";

export const wdaSessionSlice = createSlice({
  name: 'wdaSession',
  initialState: {
    sessionId: null,
    hasSessionId: false,
    error: null
  },
  reducers: {
    startSessionSuccess: (state, action) => {
      state.sessionId = action.payload;
    },
    startSessionFailure: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { startSessionSuccess, startSessionFailure } = wdaSessionSlice.actions;

export const startSession = () => async dispatch => {
  try {
    const sessionId = await createSession();
    dispatch(startSessionSuccess(sessionId));
  } catch(err) {
    dispatch(startSessionFailure(err));
  }
}

export const selectSession = state => state.wdaSession.sessionId;

export default wdaSessionSlice.reducer;
