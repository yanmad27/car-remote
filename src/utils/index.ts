export const isEmpty = (value: any) => [null, undefined, ''].includes(value);

export const unique = (value: any, index: number, self: any[]) => self.indexOf(value) === index;

export const notNull = (value: any, index: number, self: any[]) => !isEmpty(value);

export const mergeClassName = (...classNames: (string | any)[]) => classNames.filter(notNull).join(' ');
