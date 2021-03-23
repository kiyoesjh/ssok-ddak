import { all, fork, put, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';
import {
	FOLLOW_FAILURE,
	FOLLOW_REQUEST,
	FOLLOW_SUCCESS,
	LOG_IN_FAILURE,
	LOG_IN_REQUEST,
	LOG_IN_SUCCESS,
	LOG_OUT_FAILURE,
	LOG_OUT_REQUEST,
	LOG_OUT_SUCCESS,
	UNFOLLOW_FAILURE,
	UNFOLLOW_REQUEST,
	UNFOLLOW_SUCCESS,
} from 'reducers/user';

function loginAPI(data) {
	return axios.post('/api/login', data);
}

function logoutAPI() {
	return axios.post('/api/logout');
}

function* logIn(action) {
	try {
		// const result = yield call(loginAPI);
		yield delay(1000);
		yield put({
			type: LOG_IN_SUCCESS,
			// data: result.data
			data: action.data,
		});
	} catch (error) {
		yield put({
			type: LOG_IN_FAILURE,
			error: error.response.data,
		});
	}
}

function* logOut(action) {
	try {
		// const result = yield call(logoutAPI);
		yield delay(1000);
		yield put({
			type: LOG_OUT_SUCCESS,
			// data: result.data,
			data: action.data,
		});
	} catch (error) {
		yield put({
			type: LOG_OUT_FAILURE,
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

function* watchLogIn() {
	yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
	yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchFollow() {
	yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
	yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

export default function* userSaga() {
	yield all([fork(watchLogIn), fork(watchLogOut), fork(watchFollow), fork(watchUnfollow)]);
}
