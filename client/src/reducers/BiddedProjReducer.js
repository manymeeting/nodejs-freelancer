export default function BiddedProjReducer(state = [], action) {
  switch (action.type) {
  case 'ADD_PUBLISHED_PROJECT':
    return state.concat([action.newProject]);
  default:
    return state;
  }
}