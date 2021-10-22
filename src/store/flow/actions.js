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

//* ---------------------------- SET NUMBER OF GPF --------------------------- */
export function actSetNGavs({ commit }, nGavs) {
	// commit("flow/mutSetNGavs", nGavs, { root: true });  //> Tbm funciona
	commit("mutSetNGavs", nGavs);
}

//* ------------------------- TOGGLE ARROWS (HELPER) ------------------------- */
export function actTglArrows({ commit, state }, obj) {
	console.log("actTglArrows", obj.id);
	let idX = obj.id; //> Lado atual
	let idY = changeSide(obj.id); //> Lado oposto
	//[x] Verificar se outro lado está selecionado.
	if (state.FND[idX]["sel"] && state.FND[idY]["sel"]) {
		if (state.DV[obj.id.charAt(0)]["act"]) {
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
}

//* --------------------- VERTICAL DIVISION CLICK ACTION --------------------- */
export function actClkBtmDV({ commit, state }, obj) {
	//* Toggle DV
	commit("mutTglBtmDV", obj);

	let sID = obj.id;
	let tmpObj = state.FND[sID + "1"];
	actTglArrows({ commit, state }, tmpObj);

	// [ ] Adicionar lógica p/ mudar nome das saídas
	// let idX = obj.id; //> Lado atual
	// let idY = changeSide(obj.id); //> Lado oposto
}
