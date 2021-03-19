import { useEffect } from 'react';

const useScrollTo = (offsetTop, loading, ...condition) => {
	const isCondition = condition.filter(item => item).length === condition.length;
	useEffect(() => {
		if (!loading && offsetTop && isCondition) {
			window.scrollTo({ left: 0, top: offsetTop, behavior: 'smooth' });
		}
	}, [offsetTop, loading, ...condition]);
};

export default useScrollTo;
