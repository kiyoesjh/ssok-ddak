import React from 'react';
import Link from 'next/link';

const ErrorPage = () => {
	return (
		<div>
			<h1>페이지를 찾을 수 없습니다.</h1>
			<Link href="/">
				<a>메인화면으로 돌아가기</a>
			</Link>
		</div>
	);
};

export default ErrorPage;
