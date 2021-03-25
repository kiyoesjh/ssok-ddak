export const initialState = {
	ssoks: [
		{
			id: 1,
			User: {
				id: 33,
				creatorName: 'arari',
				photo: '/images/user_img.png',
			},
			Images: ['https://picsum.photos/seed/picsum/500/300'],
			category: 'affirmation',
			content: '구글에서 테스트!!! ㅎㅎㅎ ㅎㅎㅎ',
			createdAt: 1604552017773,
		},
	],
	imagePaths: [],
	addPostLoading: false,
	addPostDone: false,
	addPostError: null,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const addPostRequestAction = data => ({
	type: ADD_POST_REQUEST,
	data,
});

const dummy = data => ({
	id: data.id,
	User: {
		id: 1,
		creatorName: '구글정혜',
		photo: '/images/user_img.png',
	},
	Images: ['https://picsum.photos/seed/picsum/300/300'],
	category: 'affirmation',
	content: data.content,
	createdAt: 1604552017773,
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
