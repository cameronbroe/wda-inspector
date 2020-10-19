import { combineReducers } from '@reduxjs/toolkit';
import wdaSessionSlice from '../features/wdaSession/wdaSessionSlice';

const rootReducer = combineReducers({
  wdaSession: wdaSessionSlice
});

export default rootReducer;
