// import { reactive, toRefs } from "vue";

// const flwBottom = reactive(gpfBottom);

// export function useFlowBottom() {
// 	return {
// 		...toRefs(flwBottom),
// 		// flwBottom,
// 	};
// }

export const gpfBottom = {
	width: 250,
	height: 250,
};

let offCH = 20;
let hPorta = 32;
let hCH = parseInt(0.85 * offCH, 10);
let wFND = gpfBottom.width - 4 * offCH;
let wFNDs = gpfBottom.width / 4;
let xcFND = gpfBottom.width / 2;
let ycFND = gpfBottom.height / 2; // - hCH;
let xcPorta = xcFND;
let ycPorta = ycFND + wFND / 2 + 2 * offCH + hPorta / 2;

export const mFND = {
	main: {
		pt1: {
			x: xcFND - wFND / 2,
			y: ycFND + wFND / 2,
		},
		pt2: {
			x: xcFND - wFND / 2,
			y: ycFND - wFND / 2,
		},
		pt3: {
			x: xcFND + wFND / 2,
			y: ycFND - wFND / 2,
		},
		pt4: {
			x: xcFND + wFND / 2,
			y: ycFND + wFND / 2,
		},
	},
	F1: {
		pt1: {
			x: xcFND - wFND / 2,
			y: ycFND + wFND / 2,
		},
		pt2: {
			x: xcFND - wFNDs / 2,
			y: ycFND + wFNDs / 2,
		},
		pt3: {
			x: xcFND + 0,
			y: ycFND + wFNDs / 2,
		},
		pt4: {
			x: xcFND + 0,
			y: ycFND + wFND / 2,
		},
	},
	F2: {
		pt1: {
			x: xcFND + 0,
			y: ycFND + wFND / 2,
		},
		pt2: {
			x: xcFND + 0,
			y: ycFND + wFNDs / 2,
		},
		pt3: {
			x: xcFND + wFNDs / 2,
			y: ycFND + wFNDs / 2,
		},
		pt4: {
			x: xcFND + wFND / 2,
			y: ycFND + wFND / 2,
		},
	},
	D1: {
		pt1: {
			x: xcFND + wFNDs / 2,
			y: ycFND + 0,
		},
		pt2: {
			x: xcFND + wFNDs / 2,
			y: ycFND - wFNDs / 2,
		},
		pt3: {
			x: xcFND + wFND / 2,
			y: ycFND - wFND / 2,
		},
		pt4: {
			x: xcFND + wFND / 2,
			y: ycFND + 0,
		},
	},
	D2: {
		pt1: {
			x: xcFND + wFNDs / 2,
			y: ycFND + wFNDs / 2,
		},
		pt2: {
			x: xcFND + wFNDs / 2,
			y: ycFND + 0,
		},
		pt3: {
			x: xcFND + wFND / 2,
			y: ycFND + 0,
		},
		pt4: {
			x: xcFND + wFND / 2,
			y: ycFND + wFND / 2,
		},
	},
	E1: {
		pt1: {
			x: xcFND - wFND / 2,
			y: ycFND + 0,
		},
		pt2: {
			x: xcFND - wFND / 2,
			y: ycFND - wFND / 2,
		},
		pt3: {
			x: xcFND - wFNDs / 2,
			y: ycFND - wFNDs / 2,
		},
		pt4: {
			x: xcFND - wFNDs / 2,
			y: ycFND + 0,
		},
	},
	E2: {
		pt1: {
			x: xcFND - wFND / 2,
			y: ycFND + wFND / 2,
		},
		pt2: {
			x: xcFND - wFND / 2,
			y: ycFND + 0,
		},
		pt3: {
			x: xcFND - wFNDs / 2,
			y: ycFND + 0,
		},
		pt4: {
			x: xcFND - wFNDs / 2,
			y: ycFND + wFNDs / 2,
		},
	},
	T1: {
		pt1: {
			x: xcFND - wFNDs / 2,
			y: ycFND - wFNDs / 2,
		},
		pt2: {
			x: xcFND - wFND / 2,
			y: ycFND - wFND / 2,
		},
		pt3: {
			x: xcFND + 0,
			y: ycFND - wFND / 2,
		},
		pt4: {
			x: xcFND + 0,
			y: ycFND - wFNDs / 2,
		},
	},
	T2: {
		pt1: {
			x: xcFND + 0,
			y: ycFND - wFNDs / 2,
		},
		pt2: {
			x: xcFND + 0,
			y: ycFND - wFND / 2,
		},
		pt3: {
			x: xcFND + wFND / 2,
			y: ycFND - wFND / 2,
		},
		pt4: {
			x: xcFND + wFNDs / 2,
			y: ycFND - wFNDs / 2,
		},
	},

	Door: {
		pt1: {
			x: xcPorta - wFND / 2 - 2 * offCH,
			y: ycPorta + hPorta / 2,
		},
		pt2: {
			x: xcPorta - wFND / 2 - 2 * offCH,
			y: ycPorta - hPorta / 2,
		},
		pt3: {
			x: xcPorta + wFND / 2 + 2 * offCH,
			y: ycPorta - hPorta / 2,
		},
		pt4: {
			x: xcPorta + wFND / 2 + 2 * offCH,
			y: ycPorta + hPorta / 2,
		},
	},

	Fi: {
		pt1: {
			x: xcFND - wFND / 2,
			y: ycFND + wFND / 2 + offCH,
		},
		pt2: {
			x: xcFND - wFND / 2,
			y: ycFND + wFND / 2,
		},
		pt3: {
			x: xcFND + wFND / 2,
			y: ycFND + wFND / 2,
		},
		pt4: {
			x: xcFND + wFND / 2,
			y: ycFND + wFND / 2 + offCH,
		},
	},
	Fe: {
		pt1: {
			x: xcFND - wFND / 2,
			y: ycFND + wFND / 2 + 2 * offCH,
		},
		pt2: {
			x: xcFND - wFND / 2,
			y: ycFND + wFND / 2 + offCH,
		},
		pt3: {
			x: xcFND + wFND / 2,
			y: ycFND + wFND / 2 + offCH,
		},
		pt4: {
			x: xcFND + wFND / 2,
			y: ycFND + wFND / 2 + 2 * offCH,
		},
	},

	Di: {
		pt1: {
			x: xcFND + wFND / 2,
			y: ycFND + wFND / 2,
		},
		pt2: {
			x: xcFND + wFND / 2,
			y: ycFND - wFND / 2,
		},
		pt3: {
			x: xcFND + wFND / 2 + offCH,
			y: ycFND - wFND / 2,
		},
		pt4: {
			x: xcFND + wFND / 2 + offCH,
			y: ycFND + wFND / 2,
		},
	},
	De: {
		pt1: {
			x: xcFND + wFND / 2 + offCH,
			y: ycFND + wFND / 2,
		},
		pt2: {
			x: xcFND + wFND / 2 + offCH,
			y: ycFND - wFND / 2,
		},
		pt3: {
			x: xcFND + wFND / 2 + 2 * offCH,
			y: ycFND - wFND / 2,
		},
		pt4: {
			x: xcFND + wFND / 2 + 2 * offCH,
			y: ycFND + wFND / 2,
		},
	},
	Ei: {
		pt1: {
			x: xcFND - wFND / 2,
			y: ycFND + wFND / 2,
		},
		pt2: {
			x: xcFND - wFND / 2,
			y: ycFND - wFND / 2,
		},
		pt3: {
			x: xcFND - wFND / 2 - offCH,
			y: ycFND - wFND / 2,
		},
		pt4: {
			x: xcFND - wFND / 2 - offCH,
			y: ycFND + wFND / 2,
		},
	},
	Ee: {
		pt1: {
			x: xcFND - wFND / 2 - offCH,
			y: ycFND + wFND / 2,
		},
		pt2: {
			x: xcFND - wFND / 2 - offCH,
			y: ycFND - wFND / 2,
		},
		pt3: {
			x: xcFND - wFND / 2 - 2 * offCH,
			y: ycFND - wFND / 2,
		},
		pt4: {
			x: xcFND - wFND / 2 - 2 * offCH,
			y: ycFND + wFND / 2,
		},
	},
	Ti: {
		pt1: {
			x: xcFND - wFND / 2,
			y: ycFND - wFND / 2 - offCH,
		},
		pt2: {
			x: xcFND - wFND / 2,
			y: ycFND - wFND / 2,
		},
		pt3: {
			x: xcFND + wFND / 2,
			y: ycFND - wFND / 2,
		},
		pt4: {
			x: xcFND + wFND / 2,
			y: ycFND - wFND / 2 - offCH,
		},
	},
	Te: {
		pt1: {
			x: xcFND - wFND / 2,
			y: ycFND - wFND / 2 - 2 * offCH,
		},
		pt2: {
			x: xcFND - wFND / 2,
			y: ycFND - wFND / 2 - offCH,
		},
		pt3: {
			x: xcFND + wFND / 2,
			y: ycFND - wFND / 2 - offCH,
		},
		pt4: {
			x: xcFND + wFND / 2,
			y: ycFND - wFND / 2 - 2 * offCH,
		},
	},

	DVF: {
		pt1: {
			x: xcFND - offCH / 2,
			y: ycFND + wFND / 2,
		},
		pt2: {
			x: xcFND + offCH / 2,
			y: ycFND + wFND / 2,
		},
		pt3: {
			x: xcFND + offCH / 2,
			y: ycFND + wFND / 2 + 2 * offCH,
		},
		pt4: {
			x: xcFND - offCH / 2,
			y: ycFND + wFND / 2 + 2 * offCH,
		},
	},
	DVD: {
		pt1: {
			x: xcFND + wFND / 2,
			y: ycFND + offCH / 2,
		},
		pt2: {
			x: xcFND + wFND / 2,
			y: ycFND - offCH / 2,
		},
		pt3: {
			x: xcFND + wFND / 2 + 2 * offCH,
			y: ycFND - offCH / 2,
		},
		pt4: {
			x: xcFND + wFND / 2 + 2 * offCH,
			y: ycFND + offCH / 2,
		},
	},
	DVE: {
		pt1: {
			x: xcFND - wFND / 2,
			y: ycFND + offCH / 2,
		},
		pt2: {
			x: xcFND - wFND / 2,
			y: ycFND - offCH / 2,
		},
		pt3: {
			x: xcFND - wFND / 2 - 2 * offCH,
			y: ycFND - offCH / 2,
		},
		pt4: {
			x: xcFND - wFND / 2 - 2 * offCH,
			y: ycFND + offCH / 2,
		},
	},
	DVT: {
		pt1: {
			x: xcFND - offCH / 2,
			y: ycFND - wFND / 2,
		},
		pt2: {
			x: xcFND + offCH / 2,
			y: ycFND - wFND / 2,
		},
		pt3: {
			x: xcFND + offCH / 2,
			y: ycFND - wFND / 2 - 2 * offCH,
		},
		pt4: {
			x: xcFND - offCH / 2,
			y: ycFND - wFND / 2 - 2 * offCH,
		},
	},

	F1i: {
		pt4: {
			x: xcFND + wFND / 2 - offCH / 2,
			y: ycFND + wFND / 2 + offCH / 2,
		},
		pt1: {
			x: xcFND + offCH * 1.5,
			y: ycFND + wFND / 2 + offCH / 2,
		},
	},
	F2i: {
		pt4: {
			x: xcFND - (wFND / 2 - offCH / 2),
			y: ycFND + wFND / 2 + offCH / 2,
		},
		pt1: {
			x: xcFND - offCH * 1.5,
			y: ycFND + wFND / 2 + offCH / 2,
		},
	},
	F1e: {
		pt4: {
			x: xcFND + wFND / 2 - offCH / 2,
			y: ycFND + wFND / 2 + offCH * 1.5,
		},
		pt1: {
			x: xcFND + offCH * 1.5,
			y: ycFND + wFND / 2 + offCH * 1.5,
		},
	},
	F2e: {
		pt4: {
			x: xcFND - (wFND / 2 - offCH / 2),
			y: ycFND + wFND / 2 + offCH * 1.5,
		},
		pt1: {
			x: xcFND - offCH * 1.5,
			y: ycFND + wFND / 2 + offCH * 1.5,
		},
	},
	D1i: {
		pt4: {
			x: xcFND + wFND / 2 + offCH / 2,
			y: ycFND + wFND / 2 - offCH / 2,
		},
		pt3: {
			x: xcFND + wFND / 2 + offCH / 2,
			y: ycFND + offCH * 1.5,
		},
	},
	D1e: {
		pt4: {
			x: xcFND + wFND / 2 + offCH * 1.5,
			y: ycFND + wFND / 2 - offCH / 2,
		},
		pt3: {
			x: xcFND + wFND / 2 + offCH * 1.5,
			y: ycFND + offCH * 1.5,
		},
	},
	D2i: {
		pt4: {
			x: xcFND + wFND / 2 + offCH / 2,
			y: ycFND - (wFND / 2 - offCH / 2),
		},
		pt3: {
			x: xcFND + wFND / 2 + offCH / 2,
			y: ycFND - offCH * 1.5,
		},
	},
	D2e: {
		pt4: {
			x: xcFND + wFND / 2 + offCH * 1.5,
			y: ycFND - (wFND / 2 - offCH / 2),
		},
		pt3: {
			x: xcFND + wFND / 2 + offCH * 1.5,
			y: ycFND - offCH * 1.5,
		},
	},
	E1i: {
		pt4: {
			x: xcFND - (wFND / 2 + offCH / 2),
			y: ycFND + wFND / 2 - offCH / 2,
		},
		pt3: {
			x: xcFND - (wFND / 2 + offCH / 2),
			y: ycFND + offCH * 1.5,
		},
	},
	E1e: {
		pt4: {
			x: xcFND - (wFND / 2 + offCH * 1.5),
			y: ycFND + wFND / 2 - offCH / 2,
		},
		pt3: {
			x: xcFND - (wFND / 2 + offCH * 1.5),
			y: ycFND + offCH * 1.5,
		},
	},
	E2i: {
		pt4: {
			x: xcFND - (wFND / 2 + offCH / 2),
			y: ycFND - (wFND / 2 - offCH / 2),
		},
		pt3: {
			x: xcFND - (wFND / 2 + offCH / 2),
			y: ycFND - offCH * 1.5,
		},
	},
	E2e: {
		pt4: {
			x: xcFND - (wFND / 2 + offCH * 1.5),
			y: ycFND - (wFND / 2 - offCH / 2),
		},
		pt3: {
			x: xcFND - (wFND / 2 + offCH * 1.5),
			y: ycFND - offCH * 1.5,
		},
	},
	T1i: {
		pt4: {
			x: xcFND + wFND / 2 - offCH / 2,
			y: ycFND - (wFND / 2 + offCH / 2),
		},
		pt1: {
			x: xcFND + offCH * 1.5,
			y: ycFND - (wFND / 2 + offCH / 2),
		},
	},
	T1e: {
		pt4: {
			x: xcFND + wFND / 2 - offCH / 2,
			y: ycFND - (wFND / 2 + offCH * 1.5),
		},
		pt1: {
			x: xcFND + offCH * 1.5,
			y: ycFND - (wFND / 2 + offCH * 1.5),
		},
	},
	T2i: {
		pt4: {
			x: xcFND - (wFND / 2 - offCH / 2),
			y: ycFND - (wFND / 2 + offCH / 2),
		},
		pt1: {
			x: xcFND - offCH * 1.5,
			y: ycFND - (wFND / 2 + offCH / 2),
		},
	},
	T2e: {
		pt4: {
			x: xcFND - (wFND / 2 - offCH / 2),
			y: ycFND - (wFND / 2 + offCH * 1.5),
		},
		pt1: {
			x: xcFND - offCH * 1.5,
			y: ycFND - (wFND / 2 + offCH * 1.5),
		},
	},

	tAc: {
		x: xcFND,
		y: ycFND + wFND / 2 + offCH * 2 + hPorta / 2 - 2,
	},
	tF1: {
		x: xcFND - offCH / 2,
		y: ycFND + wFND / 2 - offCH / 2,
	},
	tF2: {
		x: xcFND + offCH / 2,
		y: ycFND + wFND / 2 - offCH / 2,
	},

	tT1: {
		x: xcFND - offCH / 2,
		y: ycFND - (wFND / 2 - offCH / 2),
	},
	tT2: {
		x: xcFND + offCH / 2,
		y: ycFND - (wFND / 2 - offCH / 2),
	},

	tD1: {
		x: xcFND + wFND / 2 - offCH / 2,
		y: ycFND - offCH / 2,
	},
	tD2: {
		x: xcFND + wFND / 2 - offCH / 2,
		y: ycFND + offCH / 2,
	},
	tE1: {
		x: xcFND - (wFND / 2 - offCH / 2),
		y: ycFND - offCH / 2,
	},
	tE2: {
		x: xcFND - (wFND / 2 - offCH / 2),
		y: ycFND + offCH / 2,
	},
};
