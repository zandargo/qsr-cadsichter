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

	let lados = ["F1", "F2", "D1", "D2", "E1", "E2", "T1", "T2"];
	const FND = {};

	for (let i = 1; i <= 8; i++) {
		let element = lados[i - 1];
		let obj = {
			name: "",
			act: 0,
			sel: 0,
			type: "",
			prod: "",
			nFrom: 0,
			nIE: 0,
		};
		FND[element] = obj;
	}

	return {
		nGavs: 0,
		iGav: 0,
		GPF,
		FND,
	};
}
