/*
export function someMutation (state) {
}
*/
export function toggleWinState(state) {
	if ((state.main.winState = "normal")) {
		state.main.winState = "maximized";
		console.log("toggleWinState", "maximized");
	} else {
		state.main.winState = "normal";
		console.log("toggleWinState", "normal");
	}
}
