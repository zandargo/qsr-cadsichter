//* ------------------------------ TOTAL HEIGHT ------------------------------ */
export function getHtotal(state) {
	let H = 0;
	let sID;
	for (let i = 1; i < state.varMain.nGavs; i++) {
		sID = "G" + ("0" + i).slice(-2);
		H += state.GPF[sID]["alt"]["gpf"];
		H += state.GPF[sID]["alt"]["spc"];
	}
	H += 32;
	return H;
}

//* --------------------------- COUNT GPF BY HEIGHT -------------------------- */
export const getNumGpfH = (state) => (val) => {
	let count = 0;
	let sID;
	for (let i = 1; i < state.varMain.nGavs; i++) {
		sID = "G" + ("0" + i).slice(-2);
		count += state.GPF[sID]["alt"]["gpf"] == val ? 1 : 0;
	}
	return count;
};
export const getNumGpfS = (state) => (val) => {
	let count = 0;
	let sID;
	for (let i = 1; i < state.varMain.nGavs; i++) {
		sID = "G" + ("0" + i).slice(-2);
		count += state.GPF[sID]["alt"]["spc"] == val ? 1 : 0;
	}
	return count;
};

//* ---------------------- GET IF Ai AND Ae ARE SYMETRIC --------------------- */
export const getSymAiAe = (state) => {
	//_ let sym = false
	let nAi = 0;
	let nAe = 0;
	for (let i = 1; i <= state.varMain.nGavs; i++) {
		let sID = "G" + ("0" + i).slice(-2);
		nAi += state.GPF[sID]["sOrig"] == "Ai" ? 1 : 0;
		nAe += state.GPF[sID]["sOrig"] == "Ae" ? 1 : 0;
	}

	return nAi == nAe;
};
