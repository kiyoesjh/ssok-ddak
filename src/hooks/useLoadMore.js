import { useCallback, useState } from 'react';

const useLoadMore = (requestFn, requestFnParams, limitLength) => {
	const [accumulatedList, setAccumulatedList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	const getData = useCallback(
		async pageNum => {
			setLoading(true);
			const { data } = await requestFn(requestFnParams, pageNum);
			if (!accumulatedList.length) {
				setAccumulatedList(data);
			} else {
				setAccumulatedList(prev => [...prev, ...data]);
			}
			setHasMore(data.length > 0 && data.length === limitLength);
			setLoading(false);
		},
		[requestFnParams, accumulatedList],
	);

	return [loading, getData, accumulatedList, hasMore];
};

export default useLoadMore;
