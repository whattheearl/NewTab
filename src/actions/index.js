import ACTIONS from './types';

// WORKSPACE
export const addWorkspace = workspace => {
    return {
        type: ACTIONS.ADD_WORKSPACE,
        payload: workspace,
    }
}

export const removeWorkspace = workspace => {
    return {
        type: ACTIONS.REMOVE_WORKSPACE,
        payload: workspace,
    }
}

export const updateWorkspace = workspace => {
    return {
        type: ACTIONS.UPDATE_WORKSPACE,
        payload: workspace,
    }
}

// EDIT WORKSPACE MODAL
export function toggleWorkspaceModal() {
    return {
        type: ACTIONS.TOGGLE_WORKSPACE_MODAL,
    }
}

// SELECTED WORKSPACE
export const selectWorkspace = (space) => {
    return {
        type: ACTIONS.SELECT_WORKSPACE,
        payload: space
    }
}

export const unselectWorkspace = () => {
    return {
        type: ACTIONS.UNSELECT_WORKSPACE
    }
}

export const addSiteToSelectedWorkspace = (site) => {
    return {
        type: ACTIONS.ADD_SITE_TO_SELECTED_WORKSPACE,
        payload: site
    }
}

export const addSite = (site) => {
    return {
        type: ACTIONS.ADD_SITE,
        payload: site
    }
}

export const removeSite = (site) => {
    return {
        type: ACTIONS.REMOVE_SITE,
        payload: site
    }
}

export const removeSitefromSelectedWorkspace = (site) => {
    return {
        type: ACTIONS.REMOVE_SITE_FROM_SELECTED_WORKSPACE,
        payload: site
    }
}

// Search Filter
export const setSearchFilter = (value) => {
    return {
        type: ACTIONS.SET_SEARCH_FILTER,
        payload: value
    }
}