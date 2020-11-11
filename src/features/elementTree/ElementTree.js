import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Treebeard } from 'react-treebeard';
import {needsElementTreeUpdate, selectElementTree, nodeToggled, cursorChanged, selectCursor} from "./elementTreeSlice";
import {selectSession} from "../wdaSession/wdaSessionSlice";
import "./ElementTree.css";

import theme from './treeTheme';


function ElementTree() {
  const sessionId = useSelector(selectSession);
  const elementTree = useSelector(selectElementTree);
  const dispatch = useDispatch();

  const onToggle = (node, toggled) => {
    node.active = true;
    if(node.children) {
      node.toggled = toggled;
    }
    dispatch(cursorChanged(node));
    dispatch(nodeToggled({ node, toggled }));
  }

  useEffect(() => { dispatch(needsElementTreeUpdate()) }, [dispatch, sessionId]);
  return (
    <div id="elementTreeContainer">
      <Treebeard style={theme} data={elementTree} onToggle={onToggle} id="elementTree" />
    </div>
  );
}

export default ElementTree;
