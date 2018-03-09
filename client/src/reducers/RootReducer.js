import { combineReducers } from 'redux';
import PublishedProjReducer from './PublishedProjReducer';
import BiddedProjReducer from './BiddedProjReducer';

export default combineReducers({
  publishedProjects: PublishedProjReducer,
  biddedProjects: BiddedProjReducer
})