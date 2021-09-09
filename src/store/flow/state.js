export default function () {
	const GPF = {};
	for (let index = 1; index <= 32; index++) {
		let element = "G" + ("0" + index).slice(-2);
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
	return {
		nGavs: 0,
		iGav: 0,
		GPF,
	};
}
