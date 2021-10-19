/*
 */
export function actSetNGavs({ commit }, nGavs) {
	// commit("flow/mutSetNGavs", nGavs, { root: true });  //> Tbm funciona
	commit("mutSetNGavs", nGavs);
}
