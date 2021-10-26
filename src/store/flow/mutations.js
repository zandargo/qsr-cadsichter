//* ---------------------------- SET NUMBER OF GPF --------------------------- */
export function mutSetNGavs(state, nGavs) {
	state.varMain.nGavs = nGavs;
}

//* ---------------------------- TOGGLE EDIT MODE ---------------------------- */
export function mutTglEditMode(state) {
	state.varMain.bEditMode = !state.varMain.bEditMode;
}

//* ---------------------- TOGGLE OUTLET SELECTION STATE --------------------- */
export function mutTglBTMsel(state, obj) {
	if (obj.act) {
		state.FND[obj.id]["sel"] = !state.FND[obj.id]["sel"];
	}
}

//* -------------------------- SET OUTLET TEXT VALUE ------------------------- */
export function mutSetBTMtxt(state, obj) {
	if (obj.sel) {
		//! A ser substituído por lógica para determinar o nome
		state.FND[obj.id]["name"] = state.FND[obj.id]["id"];
	} else {
		state.FND[obj.id]["name"] = "";
	}
}

//* ------------------------ TOGGLE VERTICAL DIVISION ------------------------ */
export function mutTglBtmDV(state, obj) {
	state.DV[obj.id]["act"] = !state.DV[obj.id]["act"];
}
export function mutSetBtmDVon(state, obj) {
	state.DV[obj.id]["act"] = true;
}
export function mutSetBtmDVoff(state, obj) {
	state.DV[obj.id]["act"] = false;
}

//* ------------------------------ TOGGLE ARROWS ----------------------------- */
export function mutSetBtmArwOn(state, obj) {
	switch (obj.nIE) {
		case 2:
			state.DI[obj.id]["i"]["act"] = true;
			state.DI[obj.id]["e"]["act"] = true;
			break;
		case 1:
			state.DI[obj.id]["i"]["act"] = false;
			state.DI[obj.id]["e"]["act"] = true;
			break;
		case 0:
			state.DI[obj.id]["i"]["act"] = true;
			state.DI[obj.id]["e"]["act"] = false;
			break;
		default:
			break;
	}
}
export function mutSetBtmArwOff(state, obj) {
	state.DI[obj.id]["i"]["act"] = false;
	state.DI[obj.id]["e"]["act"] = false;
}
