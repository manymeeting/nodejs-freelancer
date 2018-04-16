import { combineReducers } from 'redux';
import BiddedProjReducer from './BiddedProjReducer';
import AllOpenProjReducer from './AllOpenProjReducer';
import AllPublishedProjReducer from './AllPublishedProjReducer';
import AllBiddedProjReducer from './AllBiddedProjReducer';
import IncomeTransactionReducer from './IncomeTransactionReducer';
import ExpenseTransactionReducer from './ExpenseTransactionReducer';
import ProjectDetailsReducer from './ProjectDetailsReducer';
import UserInfoReducer from './UserInfoReducer';
import UserProfileReducer from './UserProfileReducer';

export default combineReducers({
	userInfo: UserInfoReducer, // information of the logged in user 
	userProfile: UserProfileReducer, // information of other user's profile 
	biddedProjects: BiddedProjReducer, // projects bidded by the the logged in user during the current session
	allOpenProjects: AllOpenProjReducer, // all projects in the system that are open for bids 
	allPublishedProjects: AllPublishedProjReducer, // all projects published by the logged in user
	allBiddedProjects: AllBiddedProjReducer, // all projects bidded by the the logged in user
	incomeTransactions: IncomeTransactionReducer, // all income transactions on user
	expenseTransactions: ExpenseTransactionReducer, // all expense transactions on user
	projectDetails: ProjectDetailsReducer // information of a project's details 
})