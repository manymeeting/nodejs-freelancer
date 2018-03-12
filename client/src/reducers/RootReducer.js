import { combineReducers } from 'redux';
import PublishedProjReducer from './PublishedProjReducer';
import BiddedProjReducer from './BiddedProjReducer';
import AllOpenProjReducer from './AllOpenProjReducer';

export default combineReducers({
  publishedProjects: PublishedProjReducer,
  biddedProjects: BiddedProjReducer,
  allOpenProjects: AllOpenProjReducer
})