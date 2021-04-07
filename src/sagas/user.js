import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import {
	CHANGE_NICKNAME_FAILURE,
	CHANGE_NICKNAME_REQUEST,
	CHANGE_NICKNAME_SUCCESS,
	FOLLOW_FAILURE,
	FOLLOW_REQUEST,
	FOLLOW_SUCCESS,
	LOAD_FOLLOWERS_FAILURE,
	LOAD_FOLLOWERS_REQUEST,
	LOAD_FOLLOWERS_SUCCESS,
	LOAD_FOLLOWINGS_FAILURE,
	LOAD_FOLLOWINGS_REQUEST,
	LOAD_FOLLOWINGS_SUCCESS,
	LOAD_MY_INFO_FAILURE,
	LOAD_MY_INFO_REQUEST,
	LOAD_MY_INFO_SUCCESS,
	LOAD_USER_FAILURE,
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOG_IN_FAILURE,
	LOG_IN_REQUEST,
	LOG_IN_SUCCESS,
	LOG_OUT_FAILURE,
	LOG_OUT_REQUEST,
	LOG_OUT_SUCCESS,
	SIGN_UP_FAILURE,
	SIGN_UP_REQUEST,
	SIGN_UP_SUCCESS,
	UNFOLLOW_FAILURE,
	UNFOLLOW_REQUEST,
	UNFOLLOW_SUCCESS,
} from 'reducers/user';

function loginAPI(data) {
	return axios.post('/user/login', data);
}

function* logIn(action) {
	try {
		const result = yield call(loginAPI, action.data);
		yield put({
			type: LOG_IN_SUCCESS,
			data: result.data,
		});
	} catch (error) {
		yield put({
			type: LOG_IN_FAILURE,
			error: error.response.data,
		});
	}
}

function logoutAPI() {
	return axios.post('/user/logout');
}

function* logOut(action) {
	try {
		yield call(logoutAPI);
		yield put({
			type: LOG_OUT_SUCCESS,
			data: action.data,
		});
	} catch (error) {
		yield put({
			type: LOG_OUT_FAILURE,
			error: error.response.data,
		});
	}
}

function signUpAPI(data) {
	return axios.post('/user', data);
}

function* signUp(action) {
	try {
		const result = yield call(signUpAPI, action.data);
		yield put({
			type: SIGN_UP_SUCCESS,
			data: result.data,
		});
	} catch (error) {
		yield put({
			type: SIGN_UP_FAILURE,
			error: error.response.data,
		});
	}
}

function followAPI(data) {
	return axios.patch(`/user/${data}/follow`);
}

function* follow(action) {
	try {
		const result = yield call(followAPI, action.data);
		yield put({
			type: FOLLOW_SUCCESS,
			data: result.data,
		});
	} catch (error) {
		yield put({
			type: FOLLOW_FAILURE,
			error: error.response.data,
		});
	}
}

function unfollowAPI(data) {
	return axios.delete(`/user/${data}/follow`);
}

function* unfollow(action) {
	try {
		const result = yield call(unfollowAPI, action.data);
		yield put({
			type: UNFOLLOW_SUCCESS,
			data: result.data,
		});
	} catch (error) {
		yield put({
			type: UNFOLLOW_FAILURE,
			error: error.response.data,
		});
	}
}

function loadFollowingsAPI(data) {
	return axios.get(`/user/followings`, data);
}

function* loadFollowings(action) {
	try {
		const result = yield call(loadFollowingsAPI, action.data);
		yield put({
			type: LOAD_FOLLOWINGS_SUCCESS,
			data: result.data,
		});
	} catch (error) {
		yield put({
			type: LOAD_FOLLOWINGS_FAILURE,
			error: error.response.data,
		});
	}
}

function loadFollowersAPI(data) {
	return axios.get(`/user/followers`, data);
}

function* loadFollowers(action) {
	try {
		const result = yield call(loadFollowersAPI, action.data);
		yield put({
			type: LOAD_FOLLOWERS_SUCCESS,
			data: result.data,
		});
	} catch (error) {
		yield put({
			type: LOAD_FOLLOWERS_FAILURE,
			error: error.response.data,
		});
	}
}

const loadMyInfoAPI = () => {
	return axios.get('/user');
};

function* loadMyInfo() {
	try {
		const result = yield call(loadMyInfoAPI);
		yield put({
			type: LOAD_MY_INFO_SUCCESS,
			data: result.data,
		});
	} catch (error) {
		console.error(error);
		yield put({
			type: LOAD_MY_INFO_FAILURE,
			error: error.response.data,
		});
	}
}

const loadUserAPI = data => {
	return axios.get(`/user/${data}`);
};

function* loadUser(action) {
	try {
		const result = yield call(loadUserAPI, action.data);
		yield put({
			type: LOAD_USER_SUCCESS,
			data: result.data,
		});
	} catch (error) {
		console.error(error);
		yield put({
			type: LOAD_USER_FAILURE,
			error: error.response.data,
		});
	}
}

const changeNicknameAPI = data => {
	return axios.patch('/user/nickname', { nickname: data });
};

function* changeNickname(action) {
	try {
		const result = yield call(changeNicknameAPI, action.data);
		yield put({
			type: CHANGE_NICKNAME_SUCCESS,
			data: result.data,
		});
	} catch (error) {
		console.error(error);
		yield put({
			type: CHANGE_NICKNAME_FAILURE,
			error: error.response.data,
		});
	}
}

function* watchLogIn() {
	yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
	yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
	yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchFollow() {
	yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
	yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* watchLoadFollwings() {
	yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function* watchLoadFollwers() {
	yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function* watchLoadMyInfo() {
	yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchLoadUserInfo() {
	yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function* watchChangeNickname() {
	yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

export default function* userSaga() {
	yield all([
		fork(watchLogIn),
		fork(watchLogOut),
		fork(watchSignUp),
		fork(watchFollow),
		fork(watchUnfollow),
		fork(watchLoadFollwings),
		fork(watchLoadFollwers),
		fork(watchLoadMyInfo),
		fork(watchLoadUserInfo),
		fork(watchChangeNickname),
	]);
}
