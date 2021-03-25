import { useCallback, useEffect, useRef } from 'react';

const useScrollTopFix = options => {
	const element = useRef(null);
	const onScroll = useCallback(([entry]) => {
		const { current } = element;
		if (!entry.isIntersecting) {
			current?.classList?.add('fix');
			return;
		}
		current?.classList?.remove('fix');
	}, []);

	useEffect(() => {
		let observer;
		if (element.current) {
			observer = new IntersectionObserver(onScroll, options);
			observer.observe(element.current);
		}
		return () => observer && observer.disconnect();
	}, [onScroll, options]);

	return {
		ref: element,
	};
};

export default useScrollTopFix;
