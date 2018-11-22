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

// saves workspace to localstorage
function saveState(state) {
    window.localStorage.setItem('workspace', JSON.stringify(state.workspace));
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

// ensures UUID is unique to workspace
function getUUID(state) {
    let uuid = uuidv1();
    // regenerate uuid if already used
    while (state.filter(space => !!space.uuid && space.uuid === uuid).length > 0) {
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
                let workspace = Object.assign({}, action.payload);
                if (!workspace.createdAt) {
                    workspace.createdAt = Date.now();
                }
                if (!workspace.modified) {
                    workspace.modified = Date.now();
                }
                if (!workspace.uuid) {
                    workspace.uuid = getUUID(state);
                }
                return [
                    ...state,
                    workspace,
                ];
            }
        case ACTIONS.REMOVE_WORKSPACE:
            {
                // remove target workspace
                const index = state.indexOf(action.payload);
                return [
                    ...state.slice(0, index),
                    ...state.slice(index + 1)
                ];
            }
        case ACTIONS.UPDATE_WORKSPACE:
            {
                let indexToBeReplaced = getIndexOfSpace(state, action.payload.uuid);
                // resplace the workspace with updated version
                return [
                    ...state.slice(0, indexToBeReplaced),
                    action.payload,
                    ...state.slice(indexToBeReplaced + 1)
                ];
            }

            // case 'REMOVE_SITE_FROM_SELECTED_WORKSPACE':
            //     const index = sites.indexOf(site)
            //     updatedWorkspace.sites = [
            //         ...sites.slice(0, index),
            //         ...sites.slice(index + 1)
            //     ];
            //     // Replace selectedWorkspace with updatedWorkspace
            //     this.props.updateWorkspace(updatedWorkspace);
            //     this.props.selectWorkspace(updatedWorkspace);
            //     return;
        default:
            return state;
    }
}