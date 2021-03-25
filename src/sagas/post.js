import { all, takeLatest, delay, fork, put } from 'redux-saga/effects';
import axios from 'axios';
import { ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS } from 'reducers/post';
import shortId from 'shortid';
import { ADD_POST_TO_ME } from 'reducers/user';

function postAPI(data) {
	return axios.post('/api/post', data);
}

function* addPost(action) {
	console.log(action);
	try {
		// const result = yield call(postAPI, action.data);
		yield delay(1000);
		const id = shortId.generate();
		yield put({
			type: ADD_POST_SUCCESS,
			// data: result.data,
			data: {
				id,
				content: action.data,
			},
		});
		// user의 Post 배열에 추가 할 수 잇도록 처리 (내가 쓴 글 목록)
		yield put({
			type: ADD_POST_TO_ME,
			data: id,
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
