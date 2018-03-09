export default function PublishedProjReducer(state = [], action) {
  switch (action.type) {
  case 'ADD_BIDDED_PROJECT':
    return state.concat([action.newProject]);
  default:
    return state;
  }
}