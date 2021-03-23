export const initialState = {
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

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

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

const dummyUser = data => {
	console.log(data);
	return {
		...data,
		id: 1,
		nickname: 'ari',
		photoURL: 'https://picsum.photos/200',
		Post: [],
		Followings: [],
		Followers: [],
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOG_IN_REQUEST:
			return {
				...state,
				logInLoading: true,
				logInDone: false,
				logInError: null,
			};
		case LOG_IN_SUCCESS:
			return {
				...state,
				logInLoading: false,
				userInfo: dummyUser(action.data),
				logInDone: true,
			};
		case LOG_IN_FAILURE:
			return {
				...state,
				logInLoading: false,
				logInError: action.error,
			};
		case LOG_OUT_REQUEST:
			return {
				...state,
				logOutLoading: true,
				logOutError: null,
				logOutDone: false,
			};
		case LOG_OUT_SUCCESS:
			return {
				...state,
				logOutLoading: false,
				logInDone: true,
				userInfo: null,
			};
		case LOG_OUT_FAILURE:
			return {
				...state,
				logOutLoading: false,
				logOutError: action.error,
			};
		case FOLLOW_REQUEST:
			return {
				...state,
				followLoading: true,
				followError: null,
				followDone: false,
			};
		case FOLLOW_SUCCESS:
			return {
				...state,
				followLoading: false,
				userInfo: {
					...state.userInfo,
					Followings: [{ id: action.data }, ...state.userInfo.Followings],
				},
				followDone: true,
			};
		case FOLLOW_FAILURE:
			return {
				...state,
				followLoading: false,
				followError: action.error,
			};
		case UNFOLLOW_REQUEST:
			return {
				...state,
				unfollowLoading: true,
				unfollowError: null,
				unfollowDone: false,
			};
		case UNFOLLOW_SUCCESS:
			return {
				...state,
				unfollowLoading: false,
				userInfo: {
					...state.userInfo,
					Followings: state.userInfo.Followings.filter(({ id }) => id !== action.data),
				},
				unfollowDone: true,
			};
		case UNFOLLOW_FAILURE:
			return {
				...state,
				unfollowLoading: false,
				unfollowError: action.error,
			};
		case ADD_POST_TO_ME:
			return {
				...state,
				userInfo: {
					...state.userInfo,
					Post: [{ id: action.data }, ...state.userInfo.Post],
				},
			};
		case REMOVE_POST_OF_ME:
			return {
				...state,
				userInfo: {
					...state.userInfo,
					Post: state.userInfo.Post.filter(({ id }) => id !== action.data),
				},
			};
		default:
			return state;
	}
};

export default reducer;
