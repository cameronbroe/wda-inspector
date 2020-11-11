import { combineReducers } from '@reduxjs/toolkit';
import wdaSessionSlice from '../features/wdaSession/wdaSessionSlice';
import screenStreamSlice from "../features/screenStream/screenStreamSlice";
import elementTreeSlice from "../features/elementTree/elementTreeSlice";

const rootReducer = combineReducers({
  wdaSession: wdaSessionSlice,
  screenSession: screenStreamSlice,
  elementTree: elementTreeSlice
});

export default rootReducer;
