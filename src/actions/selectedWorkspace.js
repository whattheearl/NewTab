export const ACTIONS = {
    SELECT_WORKSPACE: 'SELECT_WORKSPACE',
    UNSELECT_WORKSPACE: 'UNSELECT_WORKSPACE',
}

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