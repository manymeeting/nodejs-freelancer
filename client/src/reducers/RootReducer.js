import { combineReducers } from 'redux';
import PublishedProjReducer from './PublishedProjReducer';
import BiddedProjReducer from './BiddedProjReducer';
import AllOpenProjReducer from './AllOpenProjReducer';
import AllPublishedProjReducer from './AllPublishedProjReducer';
import ProjectDetailsReducer from './ProjectDetailsReducer';
import UserInfoReducer from './UserInfoReducer';

export default combineReducers({
	userInfoReducer: UserInfoReducer,
	publishedProjects: PublishedProjReducer,
	biddedProjects: BiddedProjReducer,
	allOpenProjects: AllOpenProjReducer,
	allPublishedProjects: AllPublishedProjReducer,
	projectDetails: ProjectDetailsReducer
})