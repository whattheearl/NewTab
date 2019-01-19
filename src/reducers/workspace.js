import defaultWorkspace from '../assets/data/ws2'; // Sample user state
import uuid from 'uuid/v4';
import ACTIONS from '../actions/types';

let initialState = loadWorkspace(defaultWorkspace);
// loads from local storage, if not found loads preconstructed example workspace from app
function loadWorkspace(defaultWorkspace) {
    // load from browser cache
    const localWorkspace = window.localStorage.getItem('workspace');
    if (localWorkspace) {
        return JSON.parse(localWorkspace);
    }
    // load example workspace
    // fix uuid if using older version
    const workspaces = ensureValidWorkspace(defaultWorkspace);

    // convert array state to object state
    return workspaces;
}

// generate uuid for workspace / sites
function ensureValidWorkspace(workspaces) {
    // ensure array and copy
    if (!Array.isArray(workspaces)) workspaces = [workspaces];
    let validWorkspaces = workspaces.slice();

    // ensure workspace has uuid / modified datetime / created datetime
    // ensure sites have uuid / wsuuid
    for (let space of validWorkspaces) {
        space.created = space.created || Date.now();
        space.modified = space.modified || Date.now();
        space.uuid = space._id || space.uuid || uuid();
        for (let site of space.sites) {
            site.uuid = site._id || site.uuid || uuid();
            site.wsUuid = space._id || space.uuid;
        }
    }

    // return as object
    return validWorkspaces.reduce((result, workspace) => {
        result[workspace.uuid] = workspace;
        return result;
    }, {});
}

// saves workspace to localstorage
function saveState(state) {
    window.localStorage.setItem('workspace', JSON.stringify(state));
}

export default function (state = initialState, action) {
    switch (action.type) {
        // adds a new workspace
        case ACTIONS.ADD_WORKSPACE:
            {
                // make sure uuid is attached to sites/workspace
                const validWorkspaces = ensureValidWorkspace(action.payload)

                // add overwrite any of the old state with new workspaces
                const workspaceState = {
                    ...state,
                    ...validWorkspaces,
                };
                // return new state
                saveState(workspaceState);
                return workspaceState;
            }
        case ACTIONS.REMOVE_WORKSPACE:
            {
                // filter out workspace
                const {
                    [action.payload.uuid]: filteredWorkspace,
                    ...remainingWorkspaces
                } = state;
                // return new state
                saveState(remainingWorkspaces);
                return remainingWorkspaces;
            }
        case ACTIONS.UPDATE_WORKSPACE:
            {
                const updateWorkspace = action.payload;
                // resplace the workspace with updated version
                const workspaceState = {
                    ...state,
                    [updateWorkspace.uuid]: {
                        ...state[updateWorkspace.uuid],
                        ...updateWorkspace,
                    }
                };
                // return new state
                saveState(workspaceState);
                return workspaceState;
            }
            // remove site from its workspace
        case ACTIONS.TOGGLE_FAVORITE:
            {
                const toggle_target = action.payload;
                // toggle saved state
                const workspaceState = {
                    ...state,
                    [toggle_target.uuid]: {
                        ...toggle_target,
                        saved: toggle_target.saved ? null : Date.now(),
                    },
                };
                // return new state
                saveState(workspaceState);
                return workspaceState;
            }
        case ACTIONS.REMOVE_SITE:
            {
                const workspace = state[action.payload.wsUuid];
                const workspaceState = {
                    ...state,
                    [workspace.uuid]: {
                        ...workspace,
                        sites: [
                            ...workspace.sites.filter(site => site.uuid !== action.payload.uuid),
                        ]
                    },
                };
                saveState(workspaceState);
                return workspaceState;
            }
            // add site to workspace
        case ACTIONS.ADD_SITE:
            {
                const workspace = state[action.payload.wsUuid];
                const workspaceState = {
                    ...state,
                    [workspace.uuid]: {
                        ...workspace,
                        sites: [
                            ...workspace.sites,
                            action.payload,
                        ]
                    },
                };
                saveState(workspaceState);
                return workspaceState;
            }
        default:
            return state;
    }
}