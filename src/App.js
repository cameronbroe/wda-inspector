import React, { useEffect } from 'react';
import './App.css';
import ScreenStream from "./features/screenStream/ScreenStream";
import {useDispatch} from "react-redux";
import {startSession} from "./features/wdaSession/wdaSessionSlice";
import ElementTree from "./features/elementTree/ElementTree";
import NodeViewer from "./features/elementTree/NodeViewer";

function App() {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(startSession()); });
  return (
    <div className="App">
      <ScreenStream />
      <ElementTree />
      <NodeViewer />
    </div>
  );
}

export default App;
