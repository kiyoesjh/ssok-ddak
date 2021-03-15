export const initialState = {
	isLoggingIn: false, // 로그인 시도중
	isLoggedIn: false,
	isLoggingOut: false, // 로그아웃 시도중
	userInfo: null,
	displayName: '',
	uid: 'ari',
	photoURL: 'https://picsum.photos/200',
	updateProfile: () => {},
};

export const loginRequestAction = data => {
	return {
		type: 'LOG_IN_REQUEST',
		data,
	};
};

export const loginSuccessAction = data => {
	return {
		type: 'LOG_IN_SUCCESS',
		data,
	};
};

export const loginFailureAction = () => {
	return {
		type: 'LOG_IN_FAILURE',
	};
};

export const logoutRequestAction = () => {
	return {
		type: 'LOG_OUT_REQUEST',
	};
};

export const logoutSuccess = () => {
	return {
		type: 'LOG_OUT_SUCCESS',
	};
};

export const logoutFailure = () => {
	return {
		type: 'LOG_OUT_FAILURE',
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOG_IN_REQUEST':
			return {
				...state,
				isLoggingIn: true,
			};
		case 'LOG_IN_SUCCESS':
			return {
				...state,
				isLoggingIn: false,
				isLoggedIn: true,
				userInfo: action.data,
			};
		case 'LOG_IN_FAILURE':
			return {
				...state,
				isLoggingIn: false,
				isLoggedIn: false,
			};
		case 'LOG_OUT_REQUEST':
			return {
				...state,
				isLoggingOut: true,
			};
		case 'LOG_OUT_SUCCESS':
			return {
				...state,
				isLoggingOut: false,
				isLoggedIn: false,
				userInfo: null,
			};
		case 'LOG_OUT_FAILURE':
			return {
				...state,
				isLoggingOut: false,
			};
		default:
			return state;
	}
};

export default reducer;
