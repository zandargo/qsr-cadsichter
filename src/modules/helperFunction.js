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

//* Get string position
export function getStrPos(string, subString, index) {
	return string.split(subString, index).join(subString).length;
}

//*	FUNCTION DISTANCE BETWEEN TWO POINTS
export function dist(u1, v1, u2, v2) {
	return Math.sqrt((u2 - u1) ** 2 + (v2 - v1) ** 2);
}

//* Get last nth elements
export function getLastNth(str, n) {
	let tmpA = str.split(" ");
	let len = tmpA.length;
	if (!tmpA[len - 1]) {
		tmpA.pop();
		len = tmpA.length;
	}
	return tmpA.slice(len - n).join(" ");
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

//* CONV nLado
export function convNLADO(nLado) {
	if (typeof nLado === "number") {
		switch (nLado) {
			case 1:
				return "F";
			case 2:
				return "D";
			case 3:
				return "E";
			case 4:
				return "T";
			default:
				return null;
		}
	} else {
		switch (nLado) {
			case "F":
				return 1;
			case "D":
				return 2;
			case "E":
				return 3;
			case "T":
				return 4;
			default:
				return null;
		}
	}
}

//* CONV nIE
export function convNIE(nIE) {
	if (typeof nIE === "number") {
		switch (nIE) {
			case 0:
				return "i";
			case 1:
				return "e";
			default:
				return null;
		}
	} else {
		switch (nIE) {
			case "i":
				return 0;
			case "e":
				return 1;
			default:
				return null;
		}
	}
}
