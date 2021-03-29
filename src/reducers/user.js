import produce from 'utils/produce';

export const initialState = {
	loadUserInfoLoading: false,
	loadUserInfoDone: false,
	loadUserInfoError: null,
	logInLoading: false,
	logInDone: false,
	logInError: null,
	logOutLoading: false,
	logOutDone: false,
	logOutError: false,
	signUpLoading: false,
	signUpDone: false,
	signUpError: false,
	followLoading: false,
	followDone: false,
	followError: false,
	unfollowLoading: false,
	unfollowDone: false,
	unfollowError: false,
	userInfo: null,
};

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

export const loginRequestAction = data => {
	return {
		type: LOG_IN_REQUEST,
		data,
	};
};

export const logoutRequestAction = () => {
	return {
		type: LOG_OUT_REQUEST,
	};
};

export const signUpAction = data => {
	console.log('signupAction data? ', data);
	return {
		type: SIGN_UP_REQUEST,
		data,
	};
};

const reducer = (state = initialState, action) =>
	produce(state, draft => {
		switch (action.type) {
			case LOAD_MY_INFO_REQUEST:
				draft.loadUserInfoLoading = true;
				draft.loadUserInfoDone = false;
				draft.loadUserInfoError = null;
				break;
			case LOAD_MY_INFO_SUCCESS:
				draft.oadUserInfoLoading = false;
				draft.userInfo = action.data;
				draft.oadUserInfoDone = true;
				break;
			case LOAD_MY_INFO_FAILURE:
				draft.loadUserInfoLoading = false;
				draft.loadUserInfoError = action.error;
				break;
			case LOG_IN_REQUEST:
				draft.logInLoading = true;
				draft.logInDone = false;
				draft.logInError = null;
				break;
			case LOG_IN_SUCCESS:
				draft.logInLoading = false;
				draft.userInfo = action.data;
				draft.logInDone = true;
				break;
			case LOG_IN_FAILURE:
				draft.logInLoading = false;
				draft.logInError = action.error;
				break;
			case LOG_OUT_REQUEST:
				draft.logOutLoading = true;
				draft.logOutError = null;
				draft.logOutDone = false;
				break;
			case LOG_OUT_SUCCESS:
				draft.logOutLoading = false;
				draft.logInDone = true;
				draft.signUpDone = false;
				draft.userInfo = null;
				break;
			case LOG_OUT_FAILURE:
				draft.logOutLoading = false;
				draft.logOutError = action.error;
				break;
			case FOLLOW_REQUEST:
				draft.followLoading = true;
				draft.followError = null;
				draft.followDone = false;
				break;
			case FOLLOW_SUCCESS:
				draft.followLoading = false;
				draft.userInfo.Followings = action.data;
				draft.followDone = true;
				break;
			case FOLLOW_FAILURE:
				draft.followLoading = false;
				draft.followError = action.error;
				break;
			case UNFOLLOW_REQUEST:
				draft.unfollowLoading = true;
				draft.unfollowError = null;
				draft.unfollowDone = false;
				break;
			case UNFOLLOW_SUCCESS:
				draft.unfollowLoading = false;
				draft.userInfo.Followings = draft.userInfo.Followings.filter(
					({ id }) => id !== action.data,
				);
				draft.unfollowDone = true;
				break;
			case UNFOLLOW_FAILURE:
				draft.unfollowLoading = false;
				draft.unfollowError = action.error;
				break;
			case SIGN_UP_REQUEST:
				draft.signUpLoading = true;
				draft.signUpDone = false;
				draft.signUpError = null;
				break;
			case SIGN_UP_SUCCESS:
				draft.signUpLoading = false;
				draft.signUpDone = true;
				break;
			case SIGN_UP_FAILURE:
				draft.signUpLoading = false;
				draft.signUpError = action.error;
				break;
			case ADD_POST_TO_ME:
				draft.userInfo.Posts = draft.userInfo.Posts.unshift({ id: action.data });
				break;
			case REMOVE_POST_OF_ME:
				draft.userInfo.Posts = draft.userInfo.Post.filter(({ id }) => id !== action.data);
				break;
			default:
				break;
		}
	});

export default reducer;
