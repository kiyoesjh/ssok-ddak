import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import user from 'reducers/user';
import post from 'reducers/post';

const rootReducer = (state, action) => {
	switch (action.type) {
		case HYDRATE:
			console.log('HYDRATE', action);
			return {
				...state,
				...action.payload,
			};
		default: {
			const combine = combineReducers({
				user,
				post,
			});
			return combine(state, action);
		}
	}
};

export default rootReducer;
