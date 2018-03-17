import { combineReducers } from 'redux';
import PublishedProjReducer from './PublishedProjReducer';
import BiddedProjReducer from './BiddedProjReducer';
import AllOpenProjReducer from './AllOpenProjReducer';
import AllPublishedProjReducer from './AllPublishedProjReducer';
import AllBiddedProjReducer from './AllBiddedProjReducer';
import ProjectDetailsReducer from './ProjectDetailsReducer';
import UserInfoReducer from './UserInfoReducer';

export default combineReducers({
	userInfo: UserInfoReducer,
	publishedProjects: PublishedProjReducer,
	biddedProjects: BiddedProjReducer,
	allOpenProjects: AllOpenProjReducer,
	allPublishedProjects: AllPublishedProjReducer,
	allBiddedProjects: AllBiddedProjReducer,
	projectDetails: ProjectDetailsReducer
})