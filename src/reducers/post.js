import produce from 'utils/produce';

export const initialState = {
	ssoks: [
		// {
		// 	id: 1,
		// 	User: {
		// 		id: 33,
		// 		creatorName: 'arari',
		// 		photo: '/images/user_img.png',
		// 	},
		// 	Images: ['https://picsum.photos/seed/picsum/500/300'],
		// 	category: 'affirmation',
		// 	content: '구글에서 테스트!!! ㅎㅎㅎ ㅎㅎㅎ',
		// 	createdAt: 1604552017773,
		// },
	],
	imagePaths: [],
	addPostLoading: false,
	addPostDone: false,
	addPostError: null,
	loadPostLoading: false,
	loadPostDone: false,
	loadPostError: null,
	resetPostLoading: false,
	resetPostDone: false,
	resetPostError: null,
	likePostLoading: false,
	likePostDone: false,
	likePostError: null,
	unlikePostLoading: false,
	unlikePostDone: false,
	unlikePostError: null,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const RESET_POST_REQUEST = 'RESET_POST_REQUEST';
export const RESET_POST_SUCCESS = 'RESET_POST_SUCCESS';
export const RESET_POST_FAILURE = 'RESET_POST_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const addPostRequestAction = data => ({
	type: ADD_POST_REQUEST,
	data,
});

const reducer = (state = initialState, action) =>
	produce(state, draft => {
		switch (action.type) {
			case LOAD_POST_REQUEST:
				draft.loadPostLoading = true;
				draft.loadPostDone = false;
				draft.loadPostError = null;
				break;
			case LOAD_POST_SUCCESS:
				draft.ssoks = draft.ssoks.concat(action.data);
				draft.loadPostLoading = false;
				draft.loadPostDone = true;
				draft.loadPostError = null;
				break;
			case LOAD_POST_FAILURE:
				draft.loadPostLoading = false;
				draft.loadPostError = action.error;
				break;
			case ADD_POST_REQUEST:
				draft.addPostLoading = true;
				draft.addPostDone = false;
				draft.addPostError = null;
				break;
			case ADD_POST_SUCCESS:
				draft.ssoks = draft.ssoks.unshift(action.data);
				draft.addPostLoading = false;
				draft.addPostDone = true;
				draft.addPostError = null;
				break;
			case ADD_POST_FAILURE:
				draft.addPostLoading = false;
				draft.addPostError = action.error;
				break;
			case RESET_POST_REQUEST:
				draft.resetPostLoading = true;
				draft.resetPostDone = false;
				draft.resetPostError = null;
				break;
			case RESET_POST_SUCCESS:
				draft.resetPostLoading = false;
				draft.resetPostDone = true;
				draft.ssoks = [];
				break;
			case RESET_POST_FAILURE:
				draft.resetPostDone = false;
				draft.resetPostError = true;
				break;
			case LIKE_POST_REQUEST:
				draft.likePostLoading = true;
				draft.likePostDone = false;
				draft.likePostError = null;
				break;
			case LIKE_POST_SUCCESS: {
				const post = draft.ssoks.find(ssok => ssok.id === action.data.PostId);
				post.Likers.push({ id: action.data.UserId });
				draft.likePostLoading = false;
				draft.likePostDone = true;
				break;
			}
			case LIKE_POST_FAILURE:
				draft.likePostDone = false;
				draft.likePostError = true;
				break;
			case UNLIKE_POST_REQUEST:
				draft.unlikePostLoading = true;
				draft.unlikePostDone = false;
				draft.unlikePostError = null;
				break;
			case UNLIKE_POST_SUCCESS: {
				const post = draft.ssoks.find(ssok => ssok.id === action.data.PostId);
				post.Likers = post.Likers.filter(ssok => ssok.id !== action.data.UserId);
				draft.unlikePostLoading = false;
				draft.unlikePostDone = true;
				break;
			}
			case UNLIKE_POST_FAILURE:
				draft.unlikePostDone = false;
				draft.unlikePostError = true;
				break;
			default:
				break;
		}
	});

export default reducer;
