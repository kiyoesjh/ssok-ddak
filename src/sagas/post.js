import { all, takeLatest, fork, put, call } from 'redux-saga/effects';
import axios from 'axios';
import {
	ADD_POST_FAILURE,
	ADD_POST_REQUEST,
	ADD_POST_SUCCESS,
	LIKE_POST_FAILURE,
	LIKE_POST_REQUEST,
	LIKE_POST_SUCCESS,
	LOAD_POST_FAILURE,
	LOAD_POST_REQUEST,
	LOAD_POST_SUCCESS,
	UNLIKE_POST_FAILURE,
	UNLIKE_POST_REQUEST,
	UNLIKE_POST_SUCCESS,
} from 'reducers/post';
import { ADD_POST_TO_ME } from 'reducers/user';

function postAPI(data) {
	return axios.post('/post', { content: data });
}

function* addPost(action) {
	try {
		const result = yield call(postAPI, action.data);
		yield put({
			type: ADD_POST_SUCCESS,
			data: result.data,
		});
		// user의 Post 배열에 추가 할 수 잇도록 처리 (내가 쓴 글 목록)
		yield put({
			type: ADD_POST_TO_ME,
			data: result.data.id,
		});
	} catch (error) {
		yield put({
			type: ADD_POST_FAILURE,
			error: error.response.data,
		});
	}
}

function loadPostAPI(lastId) {
	return axios.get(`/posts?lastId=${lastId || 0}`);
}

function* loadPost(action) {
	try {
		const result = yield call(loadPostAPI, action.lastId);
		yield put({
			type: LOAD_POST_SUCCESS,
			data: result.data,
		});
	} catch (error) {
		yield put({
			type: LOAD_POST_FAILURE,
			error: error.response.data,
		});
	}
}

function likePostAPI(postId) {
	return axios.patch(`/post/${postId}/like`);
}

function* likePost(action) {
	try {
		const result = yield call(likePostAPI, action.data);
		yield put({
			type: LIKE_POST_SUCCESS,
			data: result.data,
		});
	} catch (error) {
		yield put({
			type: LIKE_POST_FAILURE,
			error: error.response.data,
		});
	}
}

function unlikePostAPI(postId) {
	return axios.delete(`/post/${postId}/like`);
}

function* unlikePost(action) {
	try {
		const result = yield call(unlikePostAPI, action.data);
		yield put({
			type: UNLIKE_POST_SUCCESS,
			data: result.data,
		});
	} catch (error) {
		yield put({
			type: UNLIKE_POST_FAILURE,
			error: error.response.data,
		});
	}
}

function* watchAddPost() {
	yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchLoadPost() {
	yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchLikePost() {
	yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function* watchUnlikePost() {
	yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}

export default function* postSaga() {
	yield all([fork(watchAddPost), fork(watchLoadPost), fork(watchLikePost), fork(watchUnlikePost)]);
}
