// import { dist } from "src/modules/helperFunction";
import { xyGPF, gpfMain } from "src/modules/xyGPFmain";
import { convNLADO, convNIE, romanize } from "src/modules/helperFunction";

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
	let idS = obj.id; //> Same side
	let idO = changeSide(obj.id); //> Other side
	//[x] Verificar se outro lado está selecionado.
	if (state.FND[idS]["sel"] && state.FND[idO]["sel"]) {
		//> Both sides selected
		if (!state.DV[obj.id.charAt(0)]["act"]) {
			//> DV not active
			commit("mutSetBtmDVoff", state.DV[obj.id.charAt(0)]);
			//_ commit("mutSetBtmArwOn", state.FND[idS]);
			//_ commit("mutSetBtmArwOn", state.FND[idO]);
			commit("mutSetBtmArwOff", state.FND[idS]);
			commit("mutSetBtmArwOff", state.FND[idO]);
		} else {
			//> DV active
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
export async function actClkBtm({ commit, dispatch, state }, obj) {
	if (
		!state.varMain.bEditMode ||
		!state.varMain.cpSel.bGoBtm ||
		convNLADO(obj.id.charAt(0)) != state.varMain.cpSel.nLado
	) {
		return;
	}
	let cpSelID = state.varMain.cpSel.id;
	let sGPF = cpSelID.length > 2 ? cpSelID.slice(-5, -2) : cpSelID;
	let nGav;
	let sProd;
	let sType;
	let nIE;
	let nFrom;
	//! Qnd a lógica da GPF estiver funcionando, será feita uma verificação p/
	//! ver qual ponto está selecionado.
	//! Nesse momento, se, p.ex. T1 e T2 forem clicados, subentende-se que
	//! serão saídas do mesmo produto. Portando, desativar DV e setas

	//* Toggle variables
	if (!obj.sel) {
		nGav = state.varMain.cpSel.nOrig;
		sProd = state.varMain.cpSel.sProd;
		sType = state.varMain.cpSel.sType;
		nIE = state.varMain.cpSel.nIE;
		nFrom = state.varMain.cpSel.nOrig;
	} else {
		nGav = 0;
		sProd = null;
		sType = null;
		nIE = 0;
		nFrom = 0;
	}

	commit("mutSetBtmProp", {
		sID: obj.id,
		prop: "sProd",
		val: sProd,
	});
	commit("mutSetBtmProp", {
		sID: obj.id,
		prop: "sType",
		val: sType,
	});
	commit("mutSetBtmProp", {
		sID: obj.id,
		prop: "nIE",
		val: nIE,
	});
	commit("mutSetBtmProp", {
		sID: obj.id,
		prop: "nFrom",
		val: nFrom,
	});

	commit("mutTglBTMsel", obj);
	//_ commit("mutSetBTMtxt", obj);

	// actTglArrows({ commit, state }, obj);
	await dispatch("actTglArrows", obj);
	await dispatch("actRecalcBtm");
}

//* --------------------- VERTICAL DIVISION CLICK ACTION --------------------- */
export async function actClkBtmDV({ commit, dispatch, state }, obj) {
	if (!state.varMain.bEditMode) {
		return;
	}

	//* Toggle DV
	let sID = obj.id;
	let Lado1 = sID + "1";
	let Lado2 = sID + "2";
	if (
		state.FND[Lado1]["nFrom"] > 0 &&
		state.FND[Lado2]["nFrom"] > 0 &&
		state.FND[Lado1]["nFrom"] != state.FND[Lado2]["nFrom"]
	) {
		commit("mutTglBtmDV", obj);
		let tmpObj = state.FND[sID + "1"];
		actTglArrows({ commit, state }, tmpObj);
	}

	// [ ] Adicionar lógica p/ mudar nome das saídas
	await dispatch("actRecalcBtm");
}

//* --------------------------- RECALCULATE BOTTOM --------------------------- */
export function actRecalcBtm({ commit, getters, state }) {
	let cont = {
		nRxA: 0,
		nPnA: 0,
		nRxAi: 0,
		nPnAi: 0,
		nRxAe: 0,
		nPnAe: 0,
		nRxB: 0,
		nPnB: 0,
		nRxAB: 0,
		nPnAB: 0,
	};
	let nGavs = state.varMain.nGavs;
	let sID = null;
	let symAiAe = getters.getSymAiAe;
	//! LÓGICA:
	//!
	//! "Limpar" nomes
	let sLados = ["F1", "F2", "D1", "D2", "E1", "E2", "T1", "T2"];
	let nLados = [1, 1, 2, 2, 3, 3, 4, 4];
	// for (let i = 0; i < sLados.length; i++) {
	// 	commit("mutSetNameBtm", {
	// 		sLado: sLados[i],
	// 		sName: sLados[i],
	// 	});
	// }
	//! Combinação Rx|Pn, A|B.
	//! Varrer G01 até GXX, de RX a P2.
	//! Verificar se CP tem nIE=1 e nPara>nGav
	//! Se GXX, verificar nLado do RX
	//!
	//! Se for para o fundo, checar se o fundo recebe dele (selecionado)
	let aCP = ["RX", "P1", "P2"];
	let aTp = ["Rx", "Pn", "Pn"];
	//> nGav = 01 -> nGavs-1
	for (let i = 1; i < nGavs; i++) {
		sID = "G" + ("0" + i).slice(-2);
		//> "RX", "P1", "P2"
		for (let n = 0; n < aCP.length; n++) {
			let tmpLado = state.GPF[sID][aCP[n]]["nLado"];
			let tmpIE = state.GPF[sID][aCP[n]]["nIE"];
			let tmpPara = state.GPF[sID][aCP[n]]["nPara"];
			if (tmpLado > 0 && tmpIE == 1 && tmpPara > i) {
				//> If send to bottom
				let sObj = "n" + aTp[n] + state.GPF[sID]["sOrig"];
				let Lado1 = convNLADO(tmpLado) + "1";
				let Lado2 = convNLADO(tmpLado) + "2";
				let sVal = null;
				if (state.FND[Lado1]["nFrom"] == i || state.FND[Lado2]["nFrom"] == i) {
					cont[sObj] += 1;
					sVal = n == 0 ? cont[sObj] : romanize(cont[sObj]);
					sVal += state.GPF[sID]["sProd"];
				}

				if (state.FND[Lado1]["nFrom"] == i) {
					commit("mutSetBtmProp", {
						sID: Lado1,
						prop: "name",
						val: sVal,
					});
				}
				if (state.FND[Lado2]["nFrom"] == i) {
					commit("mutSetBtmProp", {
						sID: Lado2,
						prop: "name",
						val: sVal,
					});
				}
			}
		}
	}
	//> nGav = nGavs
	sID = "G" + ("0" + nGavs).slice(-2);
}

//* -------------------------------------------------------------------------- */
//*                                  MAIN GPF                                  */
//* -------------------------------------------------------------------------- */

//* --------------------------- SNAP CONTROL POINT --------------------------- */
export async function actSnapCP({ commit, dispatch, state }) {
	let tmpX;
	let tmpY;
	let tmpLado;
	let tmpIE;
	let tmpPara;
	let iDrag;
	let iHovr;
	let dgGPF = state.varMain.drag.nGav;
	let dType = state.varMain.drag.type;
	let hvGPF = state.varMain.hover.nGav;
	let hvPos = state.varMain.hover.pos;
	let posEnt = state.varMain.posEnt;
	let posAB = state.varMain.posAB;
	let offX = 0;

	iDrag = dgGPF.length > 2 ? parseInt(dgGPF.slice(-2), 10) : 0;
	//> Check requirements
	if (hvGPF && hvPos && dgGPF && dType) {
		iHovr = parseInt(hvGPF.slice(-2), 10);

		if (iHovr >= iDrag) {
			//> Only downward allowed
			tmpX = iDrag
				? xyGPF[hvGPF]["CPts"][hvPos]["X"]
				: xyGPF[hvGPF]["CPts"][hvPos.charAt(0) + "i"]["X"];
			tmpY = iDrag
				? xyGPF[hvGPF]["CPts"][hvPos]["Y"]
				: xyGPF[hvGPF]["CPts"][hvPos.charAt(0) + "i"]["Y"];
			tmpLado = convNLADO(hvPos.slice(0, 1));
			tmpIE = iDrag ? convNIE(hvPos.slice(-1)) : 0;
			tmpPara = iHovr;
		} else {
			//> Return home
			dgGPF.charAt(0) == "B" && posAB == "AB"
				? (offX = gpfMain.offXcp0)
				: false;
			dgGPF.charAt(0) == "B" && posAB == "BA"
				? (offX = -gpfMain.offXcp0)
				: false;
			tmpX = iDrag
				? xyGPF[dgGPF]["CPts"]["C"]["X"]
				: xyGPF["G01"]["CPts"][posEnt + "i"]["X"] + offX;
			tmpY = iDrag
				? xyGPF[dgGPF]["CPts"]["C"]["Y"]
				: xyGPF["G01"]["CPts"][posEnt + "i"]["Y"] - gpfMain.offYcp0;
			tmpLado = 0;
			tmpIE = 0;
			tmpPara = 0;
			dType == "P1" ? (tmpX -= 25) : false;
			dType == "P2" ? (tmpX += 25) : false;
		}
	} else {
		//> Not passed: Return Home
		dgGPF.charAt(0) == "B" && posAB == "AB" ? (offX = gpfMain.offXcp0) : false;
		dgGPF.charAt(0) == "B" && posAB == "BA" ? (offX = -gpfMain.offXcp0) : false;
		tmpX = iDrag
			? xyGPF[dgGPF]["CPts"]["C"]["X"]
			: xyGPF["G01"]["CPts"][posEnt + "i"]["X"] + offX;
		tmpY = iDrag
			? xyGPF[dgGPF]["CPts"]["C"]["Y"]
			: xyGPF["G01"]["CPts"][posEnt + "i"]["Y"] - gpfMain.offYcp0;
		tmpLado = 0;
		tmpIE = 0;
		tmpPara = 0;
		dType == "P1" ? (tmpX -= 25) : false;
		dType == "P2" ? (tmpX += 25) : false;
	}

	//> Ae/Be: Only internal allowed

	//> Commit selected CP info
	commit("mutSetCPsel", {
		// sID: dgGPF + dType,
		id: dgGPF + (iDrag ? dType : ""),
		nLado: tmpLado,
		nOrig: iDrag || 0,
		nIE: tmpIE || 0,
		sProd: (iDrag ? state.GPF[dgGPF]["sProd"] : dgGPF.charAt(0)) || "",
		sType: (iDrag ? dType : "RX") || "",
	});

	//> Commit if CP goes Bottom
	let tmpBool =
		tmpLado > 0 &&
		((tmpIE == 1 && iHovr > iDrag) || iDrag == state.varMain.nGavs)
			? true
			: false;
	commit("mutSelCPselGoBtm", tmpBool);

	//> Commit selected CP position
	commit("mutSetCPxy", {
		id: dgGPF,
		type: iDrag ? dType : dgGPF.charAt(0),
		X: tmpX,
		Y: tmpY,
	});

	//> Commit selected CP status
	commit("mutSetCPstatus", {
		id: dgGPF,
		type: iDrag ? dType : dgGPF.charAt(0),
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
	await dispatch("actSetProdAll");
	await dispatch("actRecalcBtm");
}

//* ----------------------- SWEEP GPF AND SET SET PROPS ---------------------- */
export async function actSetProdAll({ commit, getters, state }) {
	const aType = ["RX", "P1", "P2"];
	const aFNDid = ["F1", "F2", "D1", "D2", "E1", "E2", "T1", "T2"];
	let nLado;
	let nPara;
	let nIE;
	let aProd = [""];
	let aOrig = [""];
	for (let i = 1; i <= 32; i++) {
		aProd.push("");
		aOrig.push("");
	}
	let aFNDprops = {};
	for (let i = 0; i < aFNDid.length; i++) {
		aFNDprops[aFNDid[i]] = {
			act: false,
			nFrom: 0,
			nIE: 0,
			sType: "",
			sProd: "",
			name: aFNDid[i],
		};
	}
	// console.log("aFNDprops: ", aFNDprops);
	let nGavs = state.varMain.nGavs;

	//* External "A"
	nPara = state.GPF["G00"]["A"]["nPara"];
	if (nPara > 0) {
		aProd[nPara] += "A";
		aOrig[nPara] += "Ae";
	}
	//* External "B"
	nPara = state.GPF["G00"]["B"]["nPara"];
	if (nPara > 0) {
		aProd[nPara] += "B";
		aOrig[nPara] += "B";
	}

	//* Other GPF
	//! A primeira sempre tem A
	aProd[1] += "A";
	aOrig[1] += "Ai";
	// console.log("aProd start ", aProd);
	for (let i = 1; i <= 32; i++) {
		let sID = "G" + ("0" + i).slice(-2);
		let prod = aProd[i];
		let orig = aOrig[i];
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
						aOrig[nPara] += orig;
						// console.log("      nPara > i", `aProd[${nPara}] += ${prod}`);
					}
					//> Internal, same gpf (RX only)
					if (nPara == i && j == 0) {
						if (i < nGavs) {
							//> Not Last GPF
							aProd[i + 1] += prod;
							aOrig[i + 1] += orig;
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
	for (let i = 1; i <= 32; i++) {
		let strProd = "";
		(aProd[i].match(/A/g) || []).length > 0 ? (strProd += "A") : false;
		(aProd[i].match(/B/g) || []).length > 0 ? (strProd += "B") : false;
		commit("mutSetGPFprod", { id: "G" + ("0" + i).slice(-2), ab: strProd });
		let strOrig = "";
		aOrig[i] == "Ai" || aOrig[i] == "Ae"
			? (strOrig += aOrig[i])
			: (strOrig += strProd);
		commit("mutSetGPForig", { id: "G" + ("0" + i).slice(-2), orig: strOrig });
	}
	//* Populate state.FND
	for (let i = 0; i < aFNDid.length; i++) {
		// let aProps = ["act", "nFrom", "nIE", "sType", "sProd", "name"];
		commit("mutSetBtmProp", {
			sID: aFNDid[i],
			prop: "act",
			val: aFNDprops[aFNDid[i]]["act"],
		});
	}

	commit("mutPurgeBtm");
}
