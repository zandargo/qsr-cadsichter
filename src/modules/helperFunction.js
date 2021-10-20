export function objectFlattener(object) {
	return Reflect.apply(
		Array.prototype.concat,
		[],
		Object.keys(object).map((key) => {
			if (object[key] instanceof Object) {
				return objectFlattener(object[key]);
			}
			// return `${key}: ${object[key]}`;
			return `${object[key]}`;
		})
	);
}
