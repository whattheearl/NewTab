import ACTIONS from './types';

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