import {
    combineReducers
} from 'redux';

import displayWorkspaceModal from './displayWorkspaceModal';
import workspace from './workspace';
import selectedWorkspace from './selectedWorkspace';
import searchFilter from './searchFilter';

export default combineReducers({
    displayWorkspaceModal,
    workspace,
    selectedWorkspace,
    searchFilter,
});