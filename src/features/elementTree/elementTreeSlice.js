import { createSlice } from "@reduxjs/toolkit";
import { selectSession } from "../wdaSession/wdaSessionSlice";
import { getElementTree } from "../../api/wdaApi";
import { v4 as uuidv4 } from 'uuid';

export const elementTreeSlice = createSlice({
  name: 'elementTree',
  initialState: {
    root: {
      name: '',
      children: [],
      loading: true
    },
    error: null,
    nodeStates: {},
    cursor: null
  },
  reducers: {
    cursorChanged: (state, action) => {
      if(state.cursor) {
        state.nodeStates[state.cursor.id].active = false
      }
      state.cursor = action.payload;
    },
    nodeToggled: (state, action) => {
      state.nodeStates[action.payload.node.id] = {
        toggled: action.payload.toggled,
        active: true
      }
      state.root = Object.assign({}, state.root);
    },
    elementTreeUpdatePending: state => {
      state.root.loading = true;
    },
    elementTreeUpdateSuccess: (state, action) => {
      state.nodeStates = {};
      console.log(action.payload);
      state.root = {
        ...action.payload.value,
        loading: false
      };
    },
    elementTreeUpdateFailure: (state, action) => {
      state.error = action.payload;
      state.root.loading = false;
    },
  }
});

export const {
  elementTreeUpdateFailure,
  elementTreeUpdateSuccess,
  elementTreeUpdatePending,
  nodeToggled,
  cursorChanged
} = elementTreeSlice.actions;

const injectIds = (root) => {
  if (root.children && root.children.length > 0) {
    return {
      ...root,
      id: uuidv4(),
      children: root.children.map(node => injectIds(node))
    }
  } else {
    return {
      ...root,
      id: uuidv4()
    }
  }
}

export const needsElementTreeUpdate = () => async (dispatch, getState) => {
  try {
    dispatch(elementTreeUpdatePending());
    const sessionId = selectSession(getState());
    if(sessionId) {
      const currentTree = await getElementTree();
      currentTree.value = injectIds(currentTree.value);
      dispatch(elementTreeUpdateSuccess(currentTree));
    }
  } catch(err) {
    dispatch(elementTreeUpdateFailure(err));
  }
}

const filterElementTree = (root, nodeStates) => {
  let toggleState = true;
  if(!!nodeStates[root.id]) {
    toggleState = nodeStates[root.id].toggled;
  }

  let activeState = false;
  if(!!nodeStates[root.id]) {
    activeState = nodeStates[root.id].active;
  }

  let copiedRoot = {...root};
  delete copiedRoot.children;
  console.log(copiedRoot);

  if (root.children && root.children.length > 0) {
    return {
      id: root.id,
      name: root.type,
      children: root.children.map(node => filterElementTree(node, nodeStates)),
      toggled: toggleState,
      active: activeState,
      raw: copiedRoot
    }
  } else {
    return {
      id: root.id,
      name: root.type,
      toggled: toggleState,
      active: activeState,
      raw: copiedRoot
    }
  }
}

export const selectElementTree = state => filterElementTree(state.elementTree.root, state.elementTree.nodeStates);
export const selectCursor = state => state.elementTree.cursor;

export default elementTreeSlice.reducer;
