import { combineReducers } from '@reduxjs/toolkit';
import wdaSessionSlice from '../features/wdaSession/wdaSessionSlice';
import screenStreamSlice from "../features/screenStream/screenStreamSlice";

const rootReducer = combineReducers({
  wdaSession: wdaSessionSlice,
  screenSession: screenStreamSlice
});

export default rootReducer;
