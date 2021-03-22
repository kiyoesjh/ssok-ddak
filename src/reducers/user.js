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
	userInfo: null,
	updateProfile: () => {},
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

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
		Post: [{ id: 1 }],
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
			};
		case LOG_IN_SUCCESS:
			return {
				...state,
				logInLoading: false,
				logInDone: true,
				userInfo: dummyUser(action.data),
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
				logOutDone: false,
				logOutError: null,
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
		case ADD_POST_TO_ME:
			return {
				...state,
				userInfo: {
					...state.userInfo,
					Post: [{ id: action.data }, ...state.userInfo.Post],
				},
			};
		default:
			return state;
	}
};

export default reducer;
