import { Date } from "core-js";

//* ---------------------------- SET NUMBER OF GPF --------------------------- */
export function mutSetNGavs(state, nGavs) {
	// state.varMain.bEditMode = false;
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

export function mutPurgeBtm(state) {
	let sLados = ["F1", "F2", "D1", "D2", "E1", "E2", "T1", "T2"];
	let nLados = [1, 1, 2, 2, 3, 3, 4, 4];
	for (let i = 0; i < sLados.length; i++) {
		let nGav = state.FND[sLados[i]]["nFrom"];
		let nGavs = state.varMain.nGavs;
		let sGav = "G" + ("0" + nGav).slice(-2);
		let sType = state.FND[sLados[i]]["sType"];
		let nLado = nGav ? state.GPF[sGav][sType]["nLado"] : false;
		if (
			nGav > 0 &&
			state.FND[sLados[i]]["act"] &&
			nLados[i] == nLado &&
			((state.GPF[sGav][sType]["nIE"] == 1 &&
				state.GPF[sGav][sType]["nPara"] > nGav) ||
				(state.GPF[sGav][sType]["nIE"] == 0 &&
					state.GPF[sGav][sType]["nPara"] == nGavs))
		) {
			// Do something
		} else {
			// state.FND[sLados[i]]["act"] = false;
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
}

export function mutSetNameBtm(state, obj) {
	let sLado = obj.sLado;
	let sName = obj.sName;
	state.FND[sLado]["name"] = sName;
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
	id.length > 2
		? (state.GPF[id][type]["pos"]["X"] = X)
		: (state.GPF["G00"][type]["pos"]["X"] = X);
	id.length > 2
		? (state.GPF[id][type]["pos"]["Y"] = Y)
		: (state.GPF["G00"][type]["pos"]["Y"] = Y);
}

export function mutSetCPsel(state, obj) {
	// let sID = obj.sID;
	let sID = obj.id || "";
	let nLado = obj.nLado || 0;
	let nOrig = obj.nOrig || 0;
	let nIE = obj.nIE || 0;
	let sProd = obj.sProd || null;
	let sType = obj.sType || null;
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
	if (id.length > 2) {
		state.GPF[id][type]["nLado"] = nLado;
		state.GPF[id][type]["nIE"] = nIE;
		state.GPF[id][type]["nPara"] = nPara;
	} else {
		state.GPF["G00"][type]["nLado"] = nLado;
		state.GPF["G00"][type]["nIE"] = nIE;
		state.GPF["G00"][type]["nPara"] = nPara;
	}
}

export function mutSetGPFprod(state, obj) {
	let id = obj.id;
	let ab = obj.ab;
	state.GPF[id]["sProd"] = ab;
}
export function mutSetGPForig(state, obj) {
	let id = obj.id;
	let orig = obj.orig;
	state.GPF[id]["sOrig"] = orig;
}

//* -------------------------- SELECTED LINE POINTS -------------------------- */
export function mutSetSLpts(state, val) {
	state.varMain.cpSel.sLine = val;
}

//* ----------------------------- INLET POSITION ----------------------------- */
export function mutSetPosEnt(state, pos) {
	pos == "T" ? (state.varMain.posEnt = "T") : (state.varMain.posEnt = "F");
}

export function mutSetPosAB(state, pos) {
	state.varMain.posAB = pos == "BA" ? "BA" : "AB";
}

//* ----------------------------- HOVER SNAP AREA ---------------------------- */
export function mutSetHoverArea(state, obj) {
	let nGav = obj.nGav;
	let pos = obj.pos;
	state.varMain.hover.nGav = nGav;
	state.varMain.hover.pos = pos;
}

//* ------------------------------- GPF HEIGHT ------------------------------- */
export function mutSetGpfH(state, obj) {
	let sID = obj.id;
	let hGPF = obj.hGPF;
	let hSPC = obj.hSPC;
	state.GPF[sID]["alt"]["gpf"] = hGPF;
	state.GPF[sID]["alt"]["spc"] = hSPC;
}
