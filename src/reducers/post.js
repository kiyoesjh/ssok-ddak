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
	postAdded: false,
	imagePaths: [],
};

const dummy = {
	id: 2,
	attachmentURL: 'https://picsum.photos/seed/picsum/200/500',
	category: 'affirmation',
	createdAt: 1604552017773,
	creatorId: 'ari222',
	creatorName: 'ari',
	creatorPhoto: '/images/user_img.png',
	text: 'ㅎㅎ 하이아리',
};

const ADD_POST = 'ADD_POST';
export const addPost = {
	type: ADD_POST,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST:
			return {
				...state,
				ssoks: [dummy, ...state.ssoks],
				postAdded: true,
			};
		default:
			return state;
	}
};

export default reducer;
