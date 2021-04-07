import { produce as produceImmer, enableES5 } from 'immer';

const produce = (...args) => {
	enableES5();
	return produceImmer(...args);
};

export default produce;
