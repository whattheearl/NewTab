import {
    combineReducers
} from 'redux';

import displayWorkspaceModal from './displayWorkspaceModal';
import workspace from './workspace';

export default combineReducers({
    displayWorkspaceModal,
    workspace
});