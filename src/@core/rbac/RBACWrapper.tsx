import { useCallback } from 'react';

interface Props {
	permissionKey: string[];
	type: 'AND' | 'OR';
	children: React.ReactNode;
}
const permissions = ['user:read', 'user:write'];
const RBACWrapper = (props: Props) => {
	const allowAccess = useCallback(() => {
		if (props.type === 'AND') {
			return props.permissionKey.every((key) => permissions.includes(key));
		}
		if (props.type === 'OR') {
			return props.permissionKey.some((key) => permissions.includes(key));
		}
	}, []);
	console.log('LOG ~ allowAccess ~ allowAccess', allowAccess());

	return <>{allowAccess() && props.children}</>;
};
export default RBACWrapper;
