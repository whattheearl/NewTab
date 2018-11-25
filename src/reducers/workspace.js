import defaultWorkspace from '../assets/data/ws'; // Sample user state
import uuidv1 from 'uuid/v1';
import ACTIONS from '../actions/types';

let initialState = loadWorkspace(defaultWorkspace);
// loads from local storage, if not found loads preconstructed example workspace from app
function loadWorkspace(defaultWorkspace) {
    const localWorkspace = window.localStorage.getItem('workspace');
    let workspace = localWorkspace ? JSON.parse(localWorkspace) : defaultWorkspace;
    workspace = ensureUUID(workspace);
    return workspace
}

// ensures UUID are located on each space (was not present in previous versions)
function ensureUUID(state) {
    let missingUUID = state.filter(space => !space.uuid);
    let complete = state.filter(space => !!space.uuid);
    missingUUID.forEach(space => {
        space.uuid = getUUID(complete);
        complete.push(space);
    });
    return complete;
}

// saves workspace to localstorage
function saveState(state) {
    window.localStorage.setItem('workspace', JSON.stringify(state));
}

// ensures UUID is unique to workspace
function getUUID(state) {
    let uuid = uuidv1();
    // find unused UUID
    const filterByUUID = (space) => {
        return !!space.uuid && space.uuid === uuid;
    }
    while (state.filter(filterByUUID).length > 0) {
        uuid = uuidv1();
    }
    return uuid;
}

// find index of workspace based on uuid
function getIndexOfSpace(state, uuid) {
    for (let i = 0; i < state.length; i++) {
        let space = state[i];
        if (space.uuid === uuid) {
            return i;
        }
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        // adds a new workspace
        case ACTIONS.ADD_WORKSPACE:
            {
                const space = {
                    ...action.payload,
                    created: action.payload.created || Date.now(),
                    modified: action.payload.modified || Date.now(),
                    uuid: action.payload.uuid || getUUID(state)
                };
                const workspaceState = [
                    ...state,
                    space,
                ];
                saveState(workspaceState);
                return workspaceState;
            }
        case ACTIONS.REMOVE_WORKSPACE:
            {
                // remove target workspace
                const index = state.indexOf(action.payload);
                const workspaceState = [
                    ...state.slice(0, index),
                    ...state.slice(index + 1)
                ];
                saveState(workspaceState);
                return workspaceState;
            }
        case ACTIONS.UPDATE_WORKSPACE:
            {
                let indexToBeReplaced = getIndexOfSpace(state, action.payload.uuid);
                // resplace the workspace with updated version
                const workspaceState = [
                    ...state.slice(0, indexToBeReplaced),
                    action.payload,
                    ...state.slice(indexToBeReplaced + 1)
                ];
                saveState(workspaceState);
                return workspaceState;
            }
        default:
            return state;
    }
}