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
