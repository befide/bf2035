export * from './content.courses';
export * from './content.facilities';
export * from './content.organizations';
export * from './content.taxonomyItems';
export * from './content.theses';

export const get = (obj: any, path: string) => {
	const keys = path.split('.');
	return keys.reduce((currentObj, key) => currentObj[key], obj);
};
