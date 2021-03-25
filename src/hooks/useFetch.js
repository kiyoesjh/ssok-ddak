import { useEffect, useState } from 'react';

const useFetch = (requestFn, initialParams) => {
	const [data, setData] = useState(null);
	const [params, updateParams] = useState(initialParams);
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const requestParam = params;
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const res = await requestFn(requestParam);
				if (typeof res === 'string') {
					setHasError(true);
					setErrorMessage(res);
					return;
				}
				if (typeof res === 'undefined') {
					setHasError(true);
					setErrorMessage('오류가 발생했습니다.\n다시 시도해주세요.');
					return;
				}
				if (res) {
					setData(res.data);
				}
			} catch (err) {
				setHasError(true);
				setErrorMessage(err.message);
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, [params]);

	return { data, isLoading, hasError, errorMessage, updateParams };
};

export default useFetch;
