import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectSession} from "../wdaSession/wdaSessionSlice";
import {selectHeight, selectWidth, startScreenSession} from "./screenStreamSlice";
import "./ScreenStream.css";

function ScreenStream() {
  const sessionId = useSelector(selectSession);
  const width = useSelector(selectWidth);
  const height = useSelector(selectHeight);
  const dispatch = useDispatch();
  useEffect(() => { dispatch(startScreenSession()) }, [dispatch, sessionId]);
  return (
    <div id="screenStreamContainer">
      <img id="screenStream" alt="" src="http://localhost:9100" width={width} height={height} />
    </div>
  );
}

export default ScreenStream;
