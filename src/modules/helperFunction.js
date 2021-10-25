//* FLATTEN OBJECT -> ARRAY
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

//*	FUNCTION DISTANCE BETWEEN TWO POINTS
export function dist(u1, v1, u2, v2) {
	return Math.sqrt((u2 - u1) ** 2 + (v2 - v1) ** 2);
}

//*	CONV: INT TO ROMAN
export function romanize(num) {
	var lookup = {
			M: 1000,
			CM: 900,
			D: 500,
			CD: 400,
			C: 100,
			XC: 90,
			L: 50,
			XL: 40,
			X: 10,
			IX: 9,
			V: 5,
			IV: 4,
			I: 1,
		},
		roman = "",
		i;
	for (i in lookup) {
		while (num >= lookup[i]) {
			roman += i;
			num -= lookup[i];
		}
	}
	return roman;
}