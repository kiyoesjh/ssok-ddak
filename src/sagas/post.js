import { all, takeLatest, delay, fork, put } from 'redux-saga/effects';
import axios from 'axios';
import { ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS } from 'reducers/post';

function postAPI(data) {
	return axios.post('/api/post', data);
}

function* addPost(action) {
	try {
		// const result = yield call(postAPI, action.data);
		yield delay(1000);
		yield put({
			type: ADD_POST_SUCCESS,
			// data: result.data,
			data: action.data,
		});
	} catch (error) {
		yield put({
			type: ADD_POST_FAILURE,
			error: error.response.data,
		});
	}
}

function* watchAddPost() {
	yield takeLatest(ADD_POST_REQUEST, addPost);
}

export default function* postSaga() {
	yield all([fork(watchAddPost)]);
}
