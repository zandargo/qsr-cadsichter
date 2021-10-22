export default function () {
	const GPF = {};
	for (let i = 1; i <= 32; i++) {
		let element = "G" + ("0" + i).slice(-2);
		let obj = {
			nLado: 0,
			nPara: 0,
			nIE: 0,
		};
		GPF[element] = {
			RX: obj,
			P1: obj,
			P2: obj,
		};
	}

	let sLados = ["F1", "F2", "D1", "D2", "E1", "E2", "T1", "T2"];
	//! Variáveis para efeito de teste
	let testeProd = ["0", "0", "A", "A", "B", "B", "A", "B"];
	let testeType = ["Rx", "Pn", "Rx", "Pn", "Rx", "Pn", "Rx", "Pn"];
	let testenIE = [0, 1, 0, 1, 0, 1, 0, 1];

	const FND = {};
	for (let i = 1; i <= 8; i++) {
		let element = sLados[i - 1];
		let obj = {
			id: sLados[i - 1],
			name: "",
			act: true,
			sel: false,
			nFrom: 0,
			nIE: testenIE[i - 1],
			// type: "",
			// prod: "",
			type: testeType[i - 1],
			prod: testeProd[i - 1],
		};
		FND[element] = obj;
	}

	const DV = {
		F: {
			id: "F",
			act: false,
		},
		D: {
			id: "D",
			act: false,
		},
		E: {
			id: "E",
			act: false,
		},
		T: {
			id: "T",
			act: false,
		},
	};

	const DI = {
		F1: {
			i: {
				act: false,
			},
			e: {
				act: false,
			},
		},
		F2: {
			i: {
				act: false,
			},
			e: {
				act: false,
			},
		},
		D1: {
			i: {
				act: false,
			},
			e: {
				act: false,
			},
		},
		D2: {
			i: {
				act: false,
			},
			e: {
				act: false,
			},
		},
		E1: {
			i: {
				act: false,
			},
			e: {
				act: false,
			},
		},
		E2: {
			i: {
				act: false,
			},
			e: {
				act: false,
			},
		},
		T1: {
			i: {
				act: false,
			},
			e: {
				act: false,
			},
		},
		T2: {
			i: {
				act: false,
			},
			e: {
				act: false,
			},
		},
	};

	const varMain = {
		width: 360,
		height: 1200,
	};

	return {
		nGavs: 0,
		iGav: 0,
		GPF,
		FND,
		DV,
		DI,
		varMain,
	};
}
