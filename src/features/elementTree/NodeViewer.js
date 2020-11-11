import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { selectCursor } from "./elementTreeSlice";


function NodeViewer() {
  const cursor = useSelector(selectCursor);

  return (
    <div id="nodeViewerContainer">
      {JSON.stringify(cursor)}
    </div>
  );
}

export default NodeViewer;
