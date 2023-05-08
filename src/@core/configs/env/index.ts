const Env = {
	...process.env,
	//Public env
	NEXT_PUBLIC_BE_URL: process.env.NEXT_PUBLIC_BE_URL ?? 'http://localhost:3000',
	NEXT_PUBLIC_X_ACCESS_TOKEN: process.env.NEXT_PUBLIC_X_ACCESS_TOKEN ?? 'authorization',
	//Server env
	AUTHENTICATION_ENABLED: process.env.AUTHENTICATION_ENABLED === 'true' ?? false,
	REMOVE_CONSOLE: process.env.REMOVE_CONSOLE === 'true' ?? false,
	NOTIFY_LIBRARY: process.env.NOTIFY_LIBRARY ?? 'toast',
};

export default Env;
