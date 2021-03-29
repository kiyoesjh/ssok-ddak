import { all, fork, put, takeLatest, delay, call } from 'redux-saga/effects';
import axios from 'axios';
import {
	FOLLOW_FAILURE,
	FOLLOW_REQUEST,
	FOLLOW_SUCCESS,
	LOAD_MY_INFO_FAILURE,
	LOAD_MY_INFO_REQUEST,
	LOAD_MY_INFO_SUCCESS,
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

function* follow(action) {
	try {
		// const result = yield call(followAPI);
		yield delay(1000);
		yield put({
			type: FOLLOW_SUCCESS,
			// data: result.data,
			data: action.data,
		});
	} catch (error) {
		yield put({
			type: FOLLOW_FAILURE,
			error: error.response.data,
		});
	}
}

function* unfollow(action) {
	try {
		// const result = yield call(unfollowAPI);
		yield delay(1000);
		yield put({
			type: UNFOLLOW_SUCCESS,
			// data: result.data,
			data: action.data,
		});
	} catch (error) {
		yield put({
			type: UNFOLLOW_FAILURE,
			error: error.response.data,
		});
	}
}

const loadUserInfoAPI = () => {
	return axios.get('/user');
};

function* loadUserInfo() {
	try {
		const result = yield call(loadUserInfoAPI);
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

function* watchLoadUserInfo() {
	yield takeLatest(LOAD_MY_INFO_REQUEST, loadUserInfo);
}

export default function* userSaga() {
	yield all([
		fork(watchLogIn),
		fork(watchLogOut),
		fork(watchSignUp),
		fork(watchFollow),
		fork(watchUnfollow),
		fork(watchLoadUserInfo),
	]);
}
