export const initialState = {
	ssoks: [
		{
			id: 1,
			attachmentURL: 'https://picsum.photos/seed/picsum/500/300',
			category: 'affirmation',
			createdAt: 1604552017773,
			creatorId: 'ari',
			creatorName: '구글정혜',
			creatorPhoto: '/images/user_img.png',
			text: '구글에서 테스트!!! ㅎㅎㅎ ㅎㅎㅎ',
		},
	],
	imagePaths: [],
	addPostLoading: false,
	addPostDone: false,
	addPostError: null,
};

const dummy = data => ({
	id: 2,
	attachmentURL: 'https://picsum.photos/seed/picsum/200/200',
	category: 'affirmation',
	createdAt: 1604552017773,
	creatorId: 'ari222',
	creatorName: 'ari',
	creatorPhoto: '/images/user_img.png',
	text: data,
});

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const addPostRequestAction = data => ({
	type: ADD_POST_REQUEST,
	data,
});

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST_REQUEST:
			return {
				...state,
				addPostLoading: true,
				addPostDone: false,
				addPostError: null,
			};
		case ADD_POST_SUCCESS:
			return {
				...state,
				ssoks: [dummy(action.data), ...state.ssoks],
				addPostLoading: false,
				addPostDone: true,
				addPostError: null,
			};
		case ADD_POST_FAILURE:
			return {
				...state,
				addPostLoading: false,
				addPostError: action.error,
			};
		default:
			return state;
	}
};

export default reducer;
