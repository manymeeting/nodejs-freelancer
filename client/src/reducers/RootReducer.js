import { combineReducers } from 'redux';
import PublishedProjReducer from './PublishedProjReducer';
import BiddedProjReducer from './BiddedProjReducer';
import AllOpenProjReducer from './AllOpenProjReducer';
import ProjectDetailsReducer from './ProjectDetailsReducer';
import UserValidationReducer from './UserValidationReducer';

export default combineReducers({
	userValidation: UserValidationReducer,
	publishedProjects: PublishedProjReducer,
	biddedProjects: BiddedProjReducer,
	allOpenProjects: AllOpenProjReducer,
	projectDetails: ProjectDetailsReducer
})