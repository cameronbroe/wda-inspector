import React, { useEffect } from 'react';
import './App.css';
import ScreenStream from "./features/screenStream/ScreenStream";
import {useDispatch} from "react-redux";
import {startSession} from "./features/wdaSession/wdaSessionSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(startSession()); });
  return (
    <div className="App">
      <ScreenStream />
    </div>
  );
}

export default App;
