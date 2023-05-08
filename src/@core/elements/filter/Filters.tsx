import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';
const Context = createContext<any>({});

type ContextValue = {
	filterNames: string[];
};
interface Props {
	children: React.ReactNode;
}
const Filters = ({ children }: Props) => {
	const [filterNames, setFilterNames] = useState<any>([]);
	const router = useRouter();
	useEffect(() => {
		const newKeys: any = React.Children.map(children, (child: any) => child.props.name);
		const tableKeys = Object.keys(router?.query).filter((item: any) => item.includes('search_'));
		setFilterNames([...newKeys, ...tableKeys, 'sortBy']);
	}, [router]);
	return <Context.Provider value={{ filterNames }}>{children}</Context.Provider>;
};
export const useFiltersContext = () => useContext<ContextValue>(Context);

export default Filters;
