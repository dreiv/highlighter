
export const escapeRegExpFn = (str) => {
	// eslint-disable-next-line
	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
}

export const isScalar = (node) => {
	return (/string|number|boolean/).test(typeof node);
}
