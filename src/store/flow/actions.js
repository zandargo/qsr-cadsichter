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
	let idS = obj.id; //> Lado atual
	let idO = changeSide(obj.id); //> Lado oposto
	//[x] Verificar se outro lado está selecionado.
	if (state.FND[idS]["sel"] && state.FND[idO]["sel"]) {
		if (!state.DV[obj.id.charAt(0)]["act"]) {
			commit("mutSetBtmDVoff", state.DV[obj.id.charAt(0)]);
			commit("mutSetBtmArwOn", state.FND[idS]);
			commit("mutSetBtmArwOn", state.FND[idO]);
		} else {
			commit("mutSetBtmDVon", state.DV[obj.id.charAt(0)]);
			commit("mutSetBtmArwOff", state.FND[idS]);
			commit("mutSetBtmArwOff", state.FND[idO]);
		}
	}
	if (state.FND[idS]["sel"] && !state.FND[idO]["sel"]) {
		commit("mutSetBtmDVoff", state.DV[obj.id.charAt(0)]);
		commit("mutSetBtmArwOn", state.FND[idS]);
		commit("mutSetBtmArwOff", state.FND[idO]);
	}
	if (!state.FND[idS]["sel"] && state.FND[idO]["sel"]) {
		commit("mutSetBtmDVoff", state.DV[obj.id.charAt(0)]);
		commit("mutSetBtmArwOff", state.FND[idS]);
		commit("mutSetBtmArwOn", state.FND[idO]);
	}
	if (!state.FND[idS]["sel"] && !state.FND[idO]["sel"]) {
		commit("mutSetBtmDVoff", state.DV[obj.id.charAt(0)]);
		commit("mutSetBtmArwOff", state.FND[idS]);
		commit("mutSetBtmArwOff", state.FND[idO]);
	}
}

//* --------------------------- OUTLET CLICK ACTION -------------------------- */
export function actClkBtm({ commit, state }, obj) {
	if (!state.varMain.bEditMode) {
		return;
	}

	commit("mutTglBTMsel", obj);
	commit("mutSetBTMtxt", obj);

	let cpSelID = state.varMain.cpSelID;
	const sGPF = cpSelID.length > 2 ? cpSelID.slice(-5, -2) : cpSelID;
	const nGav = cpSelID.length > 2 ? parseInt(cpSelID.slice(-4, -2), 10) : 0;
	const sType = cpSelID.length > 2 ? cpSelID.slice(-2) : "RX";

	let nIE = cpSelID.length > 2 ? state.GPF[sGPF][sType]["nIE"] : 1;
	obj.nIE = nIE;

	actTglArrows({ commit, state }, obj);
	//! Qnd a lógica da GPF estiver funcionando, será feita uma verificação p/
	//! ver qual ponto está selecionado.
	//! Nesse momento, se, p.ex. T1 e T2 forem clicados, subentende-se que
	//! serão saídas do mesmo produto. Portando, desativar DV e setas
}

//* --------------------- VERTICAL DIVISION CLICK ACTION --------------------- */
export function actClkBtmDV({ commit, state }, obj) {
	if (!state.varMain.bEditMode) {
		return;
	}

	//* Toggle DV
	commit("mutTglBtmDV", obj);
	let sID = obj.id;
	let tmpObj = state.FND[sID + "1"];
	actTglArrows({ commit, state }, tmpObj);

	// [ ] Adicionar lógica p/ mudar nome das saídas
}

//* --------------------------- RECALCULATE BOTTOM --------------------------- */
export function actRecalcBtm({ commit, state }) {
	// commit('mutName', obj)
	// let tmpObj
	// otherAction({ commit, state }, tmpObj)
	//! 1) Para cada lado, varrer GPF e verificar se existe prod apontando p/ fnd
	//! 2) Se não houver, zerar info
	//! 3)
	//! 4)
	//! 5)
	//! 6)
}

//* -------------------------------------------------------------------------- */
//*                                  MAIN GPF                                  */
//* -------------------------------------------------------------------------- */

//* --------------------------- SNAP CONTROL POINT --------------------------- */
export function actSnapCP({ commit, dispatch, state }) {
	let tmpX;
	let tmpY;
	let tmpLado;
	let tmpIE;
	let tmpPara;
	let hvGPF = state.varMain.hover.nGav;
	let hvPos = state.varMain.hover.pos;
	let dgGPF = state.varMain.drag.nGav;
	let dType = state.varMain.drag.type;

	//> Check requirements
	if (hvGPF && hvPos && dgGPF && dType) {
		let iDrag = parseInt(dgGPF.slice(-2), 10);
		let iHovr = parseInt(hvGPF.slice(-2), 10);

		if (iHovr >= iDrag) {
			//> Only downward allowed
			tmpX = xyGPF[hvGPF]["CPts"][hvPos]["X"];
			tmpY = xyGPF[hvGPF]["CPts"][hvPos]["Y"];
			tmpLado = convNLADO(hvPos.slice(0, 1));
			tmpIE = convNIE(hvPos.slice(-1));
			tmpPara = iHovr;
		} else {
			//> Return home
			tmpX = xyGPF[dgGPF]["CPts"]["C"]["X"];
			tmpY = xyGPF[dgGPF]["CPts"]["C"]["Y"];
			tmpLado = 0;
			tmpIE = 0;
			tmpPara = 0;
			dType == "P1" ? (tmpX -= 25) : false;
			dType == "P2" ? (tmpX += 25) : false;
		}
	} else {
		//> Not passed: Return Home
		tmpX = xyGPF[dgGPF]["CPts"]["C"]["X"];
		tmpY = xyGPF[dgGPF]["CPts"]["C"]["Y"];
		tmpLado = 0;
		tmpIE = 0;
		tmpPara = 0;
		dType == "P1" ? (tmpX -= 25) : false;
		dType == "P2" ? (tmpX += 25) : false;
	}

	//> Commit selected CP id
	commit("mutSetCPsel", {
		sID: dgGPF + dType,
	});

	//> Commit selected CP position
	commit("mutSetCPxy", {
		id: dgGPF,
		type: dType,
		X: tmpX,
		Y: tmpY,
	});

	//> Commit selected CP status
	commit("mutSetCPstatus", {
		id: dgGPF,
		type: dType,
		nLado: tmpLado,
		nIE: tmpIE,
		nPara: tmpPara,
	});

	//> Reset dragging status
	commit("mutSetCPdrag", {
		isDrag: false,
		gpf: null,
		type: null,
	});
	commit("mutSetHoverArea", {
		nGav: null,
		pos: null,
	});

	//> Recalculate GPF
	dispatch("actSetProdAll");
}

//* ----------------------- SWEEP GPF AND SET SET PROPS ---------------------- */
export function actSetProdAll({ commit, state }) {
	const aType = ["RX", "P1", "P2"];
	const aFNDid = ["F1", "F2", "D1", "D2", "E1", "E2", "T1", "T2"];
	let nLado;
	let nPara;
	let nIE;
	let aProd = [""];
	for (let i = 1; i <= 32; i++) {
		aProd.push("");
	}
	let aFNDprops = {};
	for (let i = 0; i < aFNDid.length; i++) {
		aFNDprops[aFNDid[i]] = {
			act: false,
			nFrom: 0,
			nIE: 0,
			sType: "",
			sProd: "",
			name: "",
		};
	}
	// console.log("aFNDprops: ", aFNDprops);
	let nGavs = state.varMain.nGavs;

	//* External "A"
	nPara = state.GPF["G00"]["A"]["nPara"];
	if (nPara > 0) {
		aProd[nPara] += "A";
	}
	//* External "B"
	nPara = state.GPF["G00"]["B"]["nPara"];
	if (nPara > 0) {
		aProd[nPara] += "B";
	}

	//* Other GPF
	//! A primeira sempre tem A
	aProd[1] += "A";
	// console.log("aProd start ", aProd);
	for (let i = 1; i <= 32; i++) {
		let sID = "G" + ("0" + i).slice(-2);
		let prod = aProd[i];
		// console.log(sID, prod);
		if (prod) {
			for (let j = 0; j <= 2; j++) {
				nPara = state.GPF[sID][aType[j]]["nPara"];
				nIE = state.GPF[sID][aType[j]]["nIE"];
				// console.log(`  ${aType[j]}: nPara=${nPara} nIE=${nIE}`);
				if (nIE == 0) {
					// console.log("    nIE == 0");
					//> Internal, gpf below
					if (nPara > i) {
						aProd[nPara] += prod;
						// console.log("      nPara > i", `aProd[${nPara}] += ${prod}`);
					}
					//> Internal, same gpf (RX only)
					if (nPara == i && j == 0) {
						if (i < nGavs) {
							aProd[i + 1] += prod;
						} else {
							//> Last GPF
							nLado = convNLADO(state.GPF[sID][aType[j]]["nLado"]) + "1";
							aFNDprops[nLado]["act"] = true;
							nLado = convNLADO(state.GPF[sID][aType[j]]["nLado"]) + "2";
							aFNDprops[nLado]["act"] = true;
						}
						// console.log("      nPara == i", `aProd[${i + 1}] += ${prod}`);
					}
				} else {
					//> If nIE external, check if goes down with:
					if (nPara > i) {
						nLado = convNLADO(state.GPF[sID][aType[j]]["nLado"]) + "1";
						aFNDprops[nLado]["act"] = true;

						nLado = convNLADO(state.GPF[sID][aType[j]]["nLado"]) + "2";
						aFNDprops[nLado]["act"] = true;
						// console.log("      nPara > i", `aProd[${nPara}] += ${prod}`);
					}
				}
			}
		}
	}

	// console.log("aProd end ", aProd);
	// console.log("aFNDprops: ", aFNDprops);
	//* Populate state.GPF
	commit("mutResetBtm");
	for (let i = 1; i <= 32; i++) {
		let strProd = "";
		(aProd[i].match(/A/g) || []).length > 0 ? (strProd += "A") : false;
		(aProd[i].match(/B/g) || []).length > 0 ? (strProd += "B") : false;
		commit("mutSetGPFprod", { id: "G" + ("0" + i).slice(-2), ab: strProd });
	}
	//* Populate state.FND
	for (let i = 0; i < aFNDid.length; i++) {
		//> Active
		commit("mutSetBtmProp", {
			sID: aFNDid[i],
			prop: "act",
			val: aFNDprops[aFNDid[i]]["act"],
		});
	}
}
