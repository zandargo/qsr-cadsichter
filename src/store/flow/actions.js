// import { dist } from "src/modules/helperFunction";
import { xyGPF } from "src/modules/xyGPFmain";
import { convNLADO, convNIE } from "src/modules/helperFunction";

//* ---------------------------- SET NUMBER OF GPF --------------------------- */
export function actSetNGavs({ commit }, nGavs) {
	// commit("flow/mutSetNGavs", nGavs, { root: true });  //> Tbm funciona
	commit("mutSetNGavs", nGavs);
}

//* ----------------------- CHANGE SIDE NUMBER (HELPER) ---------------------- */
function changeSide(str) {
	let baseSide = str.charAt(0);
	switch (str.charAt(1)) {
		case "1":
			return baseSide + "2";
		case "2":
			return baseSide + "1";
		default:
			break;
	}
}

//* -------------------------------------------------------------------------- */
//*                               BOTTOM (OUTLET)                              */
//* -------------------------------------------------------------------------- */

//* ------------------------- TOGGLE ARROWS (HELPER) ------------------------- */
export function actTglArrows({ commit, state }, obj) {
	let idX = obj.id; //> Lado atual
	let idY = changeSide(obj.id); //> Lado oposto
	//[x] Verificar se outro lado está selecionado.
	if (state.FND[idX]["sel"] && state.FND[idY]["sel"]) {
		if (!state.DV[obj.id.charAt(0)]["act"]) {
			commit("mutSetBtmDVoff", state.DV[obj.id.charAt(0)]);
			commit("mutSetBtmArwOn", state.FND[idX]);
			commit("mutSetBtmArwOn", state.FND[idY]);
		} else {
			commit("mutSetBtmDVon", state.DV[obj.id.charAt(0)]);
			commit("mutSetBtmArwOff", state.FND[idX]);
			commit("mutSetBtmArwOff", state.FND[idY]);
		}
	}
	if (state.FND[idX]["sel"] && !state.FND[idY]["sel"]) {
		commit("mutSetBtmDVoff", state.DV[obj.id.charAt(0)]);
		commit("mutSetBtmArwOn", state.FND[idX]);
		commit("mutSetBtmArwOff", state.FND[idY]);
	}
	if (!state.FND[idX]["sel"] && state.FND[idY]["sel"]) {
		commit("mutSetBtmDVoff", state.DV[obj.id.charAt(0)]);
		commit("mutSetBtmArwOff", state.FND[idX]);
		commit("mutSetBtmArwOn", state.FND[idY]);
	}
	if (!state.FND[idX]["sel"] && !state.FND[idY]["sel"]) {
		commit("mutSetBtmDVoff", state.DV[obj.id.charAt(0)]);
		commit("mutSetBtmArwOff", state.FND[idX]);
		commit("mutSetBtmArwOff", state.FND[idY]);
	}
}

//* --------------------------- OUTLET CLICK ACTION -------------------------- */
export function actClkBtm({ commit, state }, obj) {
	commit("mutTglBTMsel", obj);
	commit("mutSetBTMtxt", obj);
	actTglArrows({ commit, state }, obj);
	//! Qnd a lógica da GPF estiver funcionando, será feita uma verificação p/
	//! ver qual ponto está selecionado.
	//! Nesse momento, se, p.ex. T1 e T2 forem clicados, subentende-se que
	//! serão saídas do mesmo produto. Portando, desativar DV e setas
}

//* --------------------- VERTICAL DIVISION CLICK ACTION --------------------- */
export function actClkBtmDV({ commit, state }, obj) {
	//* Toggle DV
	commit("mutTglBtmDV", obj);
	let sID = obj.id;
	let tmpObj = state.FND[sID + "1"];
	actTglArrows({ commit, state }, tmpObj);

	// [ ] Adicionar lógica p/ mudar nome das saídas
}

//* -------------------------------------------------------------------------- */
//*                                  MAIN GPF                                  */
//* -------------------------------------------------------------------------- */

export function actSnapCP({ commit, state }) {
	let tmpX;
	let tmpY;
	let tmpLado;
	let tmpIE;
	let tmpPara;
	let hvGPF = state.varMain.hover.nGav;
	let hvPos = state.varMain.hover.pos;
	let dgGPF = state.varMain.drag.nGav;
	let dType = state.varMain.drag.type;

	if (hvGPF && hvPos && dgGPF && dType) {
		let iDrag = parseInt(dgGPF.slice(-2), 10);
		let iHovr = parseInt(hvGPF.slice(-2), 10);
		if (iHovr >= iDrag) {
			tmpX = xyGPF[hvGPF]["CPts"][hvPos]["X"];
			tmpY = xyGPF[hvGPF]["CPts"][hvPos]["Y"];
			tmpLado = convNLADO(hvPos.slice(0, 1));
			tmpIE = convNIE(hvPos.slice(-1));
			tmpPara = iHovr;
		} else {
			tmpX = xyGPF[dgGPF]["CPts"]["C"]["X"];
			tmpY = xyGPF[dgGPF]["CPts"]["C"]["Y"];
			tmpLado = 0;
			tmpIE = 0;
			tmpPara = 0;
			dType == "P1" ? (tmpX -= 25) : false;
			dType == "P2" ? (tmpX += 25) : false;
		}
	} else {
		tmpX = xyGPF[dgGPF]["CPts"]["C"]["X"];
		tmpY = xyGPF[dgGPF]["CPts"]["C"]["Y"];
		tmpLado = 0;
		tmpIE = 0;
		tmpPara = 0;
		dType == "P1" ? (tmpX -= 25) : false;
		dType == "P2" ? (tmpX += 25) : false;
	}

	commit("mutSetCPxy", {
		id: dgGPF,
		type: dType,
		X: tmpX,
		Y: tmpY,
	});

	commit("mutSetCPstatus", {
		id: dgGPF,
		type: dType,
		nLado: tmpLado,
		nIE: tmpIE,
		nPara: tmpPara,
	});

	commit("mutSetCPdrag", {
		isDrag: false,
		gpf: null,
		type: null,
	});
	commit("mutSetHoverArea", {
		nGav: null,
		pos: null,
	});
}
