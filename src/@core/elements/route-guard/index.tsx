import Config from '@core/configs';
import Spin from '@core/elements/spin';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import nProgress from 'nprogress';
import { useEffect, useState } from 'react';

nProgress.configure({ showSpinner: false, trickleSpeed: 120 });

interface Props {
	children: React.ReactNode;
}

const RouteGuard = ({ children }: Props) => {
	const router = useRouter();
	const [authorized, setAuthorized] = useState(false);

	useEffect(() => {
		// on initial load - run auth check
		authCheck(router.asPath);

		// on route change start - hide page content by setting authorized to false
		const hideContent = () => {
			nProgress.start();
			setAuthorized(false);
		};

		router.events.on('routeChangeStart', hideContent);

		// on route change complete - run auth check
		router.events.on('routeChangeComplete', authCheck);

		// unsubscribe from events in useEffect return function
		return () => {
			router.events.off('routeChangeStart', hideContent);
			router.events.off('routeChangeComplete', authCheck);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const authCheck = (url: string) => {
		nProgress.done();
		if (!Config.Env.AUTHENTICATION_ENABLED) {
			setAuthorized(true);
			return;
		}
		// redirect to login page if accessing a private page and not logged in
		const publicPaths = ['/login', '/404'];
		const path = url.split('?')[0];
		const xAccessToken = Cookies.get(Config.Env.NEXT_PUBLIC_X_ACCESS_TOKEN || '');
		if (!xAccessToken && !publicPaths.includes(path)) {
			setAuthorized(false);
			router.push({
				pathname: '/login',
				query: { returnUrl: router.asPath },
			});
		} else {
			setAuthorized(true);
		}
	};

	return (
		<Spin spinning={!authorized} delay={500}>
			{children}
		</Spin>
	);
};

export default RouteGuard;
