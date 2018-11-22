// case 'SELECT_WORKSPACE':
// if (payload.workspace !== undefined) {
//     this.setState({
//         selectedWorkspace: payload.workspace
//     });
//     return;
// }
// let target = this.state.workspaces.filter(space => String(space.uuid) === String(payload.uuid));
// if (target.length === 1) {
//     this.setState({
//         selectedWorkspace: target[0]
//     });
// } else {
//     console.error('Workspaces with same id', target);
// }
// return;
// // probably dont want workspace logic and workspaces logic in the same handler