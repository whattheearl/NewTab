import defaultWorkspace from '../assets/data/ws2'; // Sample user state
import uuid from 'uuid/v4';
import ACTIONS from '../actions/types';

let initialState = loadWorkspace(defaultWorkspace);
// loads from local storage, if not found loads preconstructed example workspace from app
function loadWorkspace(defaultWorkspace) {
    const localWorkspace = window.localStorage.getItem('workspace');
    let workspace = localWorkspace ? JSON.parse(localWorkspace) : defaultWorkspace;
    workspace = ensureUUID(workspace);
    return workspace
}

// generate uuid for workspace / sites
function ensureUUID(initialState) {
    let newState = initialState.slice();
    for (let i = 0; i < newState.length; i++) {
        let space = newState[i];
        const wsUuid = space.uuid || uuid();
        space.uuid = wsUuid;
        for (let j = 0; j < space.sites.length; j++) {
            let site = space.sites[j];
            if (!site.uuid) site.uuid = uuid();
            site.wsUuid = wsUuid;
        }
    }
    return newState;
}

// saves workspace to localstorage
function saveState(state) {
    window.localStorage.setItem('workspace', JSON.stringify(state));
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
                // make sure uuid is attached to sites/workspace
                const space = ensureUUID([{
                    ...action.payload,
                    created: action.payload.created || Date.now(),
                    modified: action.payload.modified || Date.now(),
                    uuid: action.payload.uuid || uuid(),
                }]);
                const workspaceState = [
                    ...state,
                    space[0],
                ];
                console.log(space);
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
            // remove site from its workspace
        case ACTIONS.TOGGLE_FAVORITE:
            {
                let indexToBeReplaced = getIndexOfSpace(state, action.payload.uuid);
                const workspaceState = [
                    ...state.slice(0, indexToBeReplaced),
                    {
                        ...action.payload,
                        saved: !!action.payload.saved ? false : Date.now(),
                    },
                    ...state.slice(indexToBeReplaced + 1)
                ];
                saveState(workspaceState);
                return workspaceState;
            }
        case ACTIONS.REMOVE_SITE:
            {
                let index = getIndexOfSpace(state, action.payload.wsUuid);
                const workspace = state[index];
                const workspaceState = [
                    ...state.slice(0, index),
                    {
                        ...workspace,
                        sites: [
                            ...workspace.sites.filter(site => site.uuid !== action.payload.uuid)
                        ]
                    },
                    ...state.slice(index + 1)
                ];
                saveState(workspaceState);
                return workspaceState;
            }
            // add site to workspace
        case ACTIONS.ADD_SITE:
            {
                let index = getIndexOfSpace(state, action.payload.wsUuid);
                const workspace = state[index];
                const workspaceState = [
                    ...state.slice(0, index),
                    {
                        ...workspace,
                        sites: [
                            ...workspace.sites,
                            action.payload
                        ]
                    },
                    ...state.slice(index + 1)
                ];
                saveState(workspaceState);
                return workspaceState;
            }
        default:
            return state;
    }
}