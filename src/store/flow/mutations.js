import { Date } from "core-js";

//* ---------------------------- SET NUMBER OF GPF --------------------------- */
export function mutSetNGavs(state, nGavs) {
	state.varMain.nGavs = nGavs;
}

//* -------------------------------------------------------------------------- */
//*                               BOTTOM (OUTLET)                              */
//* -------------------------------------------------------------------------- */

//* ------------------------------ RESET BOTTOM ------------------------------ */
export function mutResetBtm(state) {
	let sLados = ["F1", "F2", "D1", "D2", "E1", "E2", "T1", "T2"];
	for (let i = 0; i < sLados.length; i++) {
		state.FND[sLados[i]]["act"] = false;
		state.FND[sLados[i]]["sel"] = false;
		state.FND[sLados[i]]["nFrom"] = 0;
		state.FND[sLados[i]]["nIE"] = 0;
		state.FND[sLados[i]]["sType"] = "";
		state.FND[sLados[i]]["sProd"] = "";
		state.FND[sLados[i]]["name"] = "";

		state.DI[sLados[i]]["i"]["act"] = false;
		state.DI[sLados[i]]["e"]["act"] = false;
	}
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

//* ------------------------------ SET FND PROPS ----------------------------- */
export function mutSetBtmProp(state, obj) {
	let sID = obj.sID;
	let prop = obj.prop;
	let val = obj.val;
	state.FND[sID][prop] = val;
}

//* -------------------------------------------------------------------------- */
//*                                MAIN GPF FLOW                               */
//* -------------------------------------------------------------------------- */

//* ---------------------------- TOGGLE EDIT MODE ---------------------------- */
export function mutTglEditMode(state) {
	state.varMain.bEditMode = !state.varMain.bEditMode;
}
//* ----------------------------- CONTROL POINTS ----------------------------- */
export function mutSetCPdrag(state, obj) {
	let isDrag = obj.isDrag;
	let gpf = obj.gpf;
	let type = obj.type;

	state.varMain.bCPdrag = isDrag;
	state.varMain.drag.nGav = gpf;
	state.varMain.drag.type = type;
}
export function mutSetCPstamp(state) {
	state.varMain.drag.lastDrop = Date.now();
}

export function mutSetCPxy(state, obj) {
	let id = obj.id;
	let type = obj.type;
	let X = obj.X;
	let Y = obj.Y;
	state.GPF[id][type]["pos"]["X"] = X;
	state.GPF[id][type]["pos"]["Y"] = Y;
}

export function mutSetCPsel(state, obj) {
	// let sID = obj.sID;
	let sID = obj.id || "";
	let nLado = obj.nLado || 0;
	let nOrig = obj.nOrig || "";
	let nIE = obj.nIE || "";
	let sProd = obj.sProd || "";
	let sType = obj.sType || "";
	state.varMain.cpSel.id = sID;
	state.varMain.cpSel.nLado = nLado;
	state.varMain.cpSel.nOrig = nOrig;
	state.varMain.cpSel.nIE = nIE;
	state.varMain.cpSel.sProd = sProd;
	state.varMain.cpSel.sType = sType;
}
export function mutSelCPselGoBtm(state, val) {
	state.varMain.cpSel.bGoBtm = val;
}

export function mutSetCPstatus(state, obj) {
	let id = obj.id;
	let type = obj.type;
	let nLado = obj.nLado;
	let nIE = obj.nIE;
	let nPara = obj.nPara;
	state.GPF[id][type]["nLado"] = nLado;
	state.GPF[id][type]["nIE"] = nIE;
	state.GPF[id][type]["nPara"] = nPara;
}

export function mutSetGPFprod(state, obj) {
	let id = obj.id;
	let ab = obj.ab;
	state.GPF[id]["sProd"] = ab;
}

//* -------------------------- SELECTED LINE POINTS -------------------------- */
export function mutSetSLpts(state, val) {
	state.varMain.cpSel.sLine = val;
}

//* ----------------------------- INLET POSITION ----------------------------- */
export function mutSetPosEnt(state, pos) {
	pos == "T" ? (state.varMain.posEnt = "T") : (state.varMain.posEnt = "F");
}

//* ----------------------------- HOVER SNAP AREA ---------------------------- */
export function mutSetHoverArea(state, obj) {
	let nGav = obj.nGav;
	let pos = obj.pos;
	state.varMain.hover.nGav = nGav;
	state.varMain.hover.pos = pos;
}
