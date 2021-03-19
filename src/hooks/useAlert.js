import { useContext } from 'react';
import { AlertDispatchContext } from 'context/AlertContext';
import { useRouter } from 'next/router';

const useAlert = (alertType = 'alert') => {
	const router = useRouter();
	const alertDispatch = useContext(AlertDispatchContext);

	const alertHandler = ({
		result,
		message,
		title,
		confirmURL,
		cancelURL,
		confirmHandler,
		cancelHandler,
		confirmText,
		cancelText,
	}) => {
		const defaultHandler = type => {
			const url = type === 'confirm' ? confirmURL : cancelURL;
			if (url) {
				router.replace(url);
			}
			alertDispatch({ type: 'CLOSE' });
		};
		alertDispatch({
			type: alertType.toUpperCase(),
			alertType,
			propsValue: {
				title,
				description: typeof result === 'string' ? result : message,
				confirmText,
				cancelText,
				onConfirmClick: () => {
					if (confirmHandler) {
						confirmHandler();
						alertDispatch({ type: 'CLOSE' });
						return;
					}
					defaultHandler('confirm');
				},
				onCancelClick: () => {
					if (cancelHandler) {
						cancelHandler();
						alertDispatch({ type: 'CLOSE' });
						return;
					}
					defaultHandler('cancel');
				},
			},
		});
	};
	return alertHandler;
};

export default useAlert;
