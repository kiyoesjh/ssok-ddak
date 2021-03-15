import { all, takeLatest, delay, fork, put } from 'redux-saga/effects';
import axios from 'axios';

function postAPI(data) {
	return axios.post('/api/post', data);
}

function* addPost(action) {
	try {
		// const result = yield call(postAPI, action.data);
		yield delay(1000);
		yield put({
			type: 'ADD_POST_SUCCESS',
			// data: result.data
		});
	} catch (error) {
		yield put({
			type: 'ADD_POST_FAILURE',
			data: error.response.data,
		});
	}
}

function* watchAddPost() {
	yield takeLatest('ADD_POST_REQUEST', addPost);
}

export default function* postSaga() {
	yield all([fork(watchAddPost)]);
}
