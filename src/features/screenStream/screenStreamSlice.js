import { createSlice } from "@reduxjs/toolkit";
import {getWindowSize} from "../../api/wdaApi";
import {selectSession} from "../wdaSession/wdaSessionSlice";

export const screenSessionSlice = createSlice({
  name: 'screenSession',
  initialState: {
    width: 0,
    height: 0,
    error: null
  },
  reducers: {
    screenSessionStarted: (state, action) => {
      state.width = action.payload.width;
      state.height = action.payload.height;
    },
    screenSessionFailure: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { screenSessionStarted, screenSessionFailure } = screenSessionSlice.actions;

export const startScreenSession = () => async (dispatch, getState) => {
  try {
    const sessionId = selectSession(getState());
    if(sessionId) {
      const dimensions = await getWindowSize(sessionId);
      console.log('dimensions: ', dimensions);
      dispatch(screenSessionStarted(dimensions.value));
    }
  } catch(err) {
    dispatch(screenSessionFailure(err));
  }
}

export const selectWidth = state => state.screenSession.width;
export const selectHeight = state => state.screenSession.height;

export default screenSessionSlice.reducer;
