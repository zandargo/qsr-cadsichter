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
	height: 280,
};

let offCH = 20;
let hPorta = 25;
let hCH = parseInt(0.85 * offCH, 10);
let wFND = gpfBottom.width - 4 * offCH;
let wFNDs = gpfBottom.width / 4;
let xcFND = gpfBottom.width / 2;
let ycFND = gpfBottom.height / 2 - hCH;
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
};
