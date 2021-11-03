<template>
	//* SELECTION LINE
	<defs>
		<!-- <mask id="maskSL" maskunits="userSpaceOnUse">
			<polyline :points="aPoly()" stroke="white" stroke-width="30" />
			<polyline :points="aPoly()" stroke="black" stroke-width="8" />
		</mask>
		<mask id="maskSLTeste" maskunits="userSpaceOnUse">
			<polyline points="200 192 65 192" stroke="white" stroke-width="30" />
			<polyline points="200 192 65 192" stroke="black" stroke-width="8" />
		</mask> -->
	</defs>

	//* SELECTION LINE
	<g id="gSelLin" mask="url(#maskSL_)">
		<polyline :points="aPoly" class="SelLin SelLin1" />
		<polyline :points="aPoly" class="mSelLin mSelLin1" />
	</g>
</template>

<script>
//* -------------------------------- SCRIPT -------------------------------- *//
import { computed } from "vue";
import { useStore } from "vuex";
import {
	objectFlattener,
	convNLADO,
	convNIE,
} from "src/modules/helperFunction";
import { gpfMain, xyGPF } from "src/modules/xyGPFmain";

export default {
	name: "svgFlowLine",
	setup() {
		const $store = useStore();
		const flat = (obj) => objectFlattener(obj);
		const cLado = (nLado) => convNLADO(nLado);
		const cIE = (nIE) => convNIE(nIE);

		const cpSelID = computed({
			get: () => $store.state.flow.varMain.cpSelID,
			set: () => $store.commit("flow/mutName"),
		});
		// const sGPF =
		// 	cpSelID.value.length > 2 ? cpSelID.value.slice(-5, -2) : cpSelID.value;
		const sGPF = computed(() => {
			return cpSelID.value.length > 2
				? cpSelID.value.slice(-5, -2)
				: cpSelID.value;
		});
		// const nGav =
		// 	cpSelID.value.length > 2 ? parseInt(cpSelID.value.slice(-4, -2), 10) : 0;
		const nGav = computed(() => {
			return cpSelID.value.length > 2
				? parseInt(cpSelID.value.slice(-4, -2), 10)
				: 0;
		});
		// const sType = cpSelID.value.length > 2 ? cpSelID.value.slice(-2) : "RX";
		const sType = computed(() => {
			return cpSelID.value.length > 2 ? cpSelID.value.slice(-2) : "RX";
		});
		const sProd = computed({
			get: () => {
				let str = "";
				switch (sGPF.value) {
					case "Ai":
						str = "A";
						break;
					case "Ae":
						str = "A";
						break;
					case "Be":
						str = "B";
						break;
					default:
						str = $store.state.flow.GPF[sGPF.value]["sProd"] || "0";
						break;
				}
				return str;
			},
			set: () => $store.commit("module/mutName"),
		});
		const posEnt = computed({
			get: () => $store.state.flow.varMain.posEnt,
			set: () => {},
		});
		const objCP = computed({
			get: () => {
				let tmpObj;
				switch (sGPF.value) {
					case "Ai":
						tmpObj = {
							act: true,
							nPara: 0,
						};
						break;
					case "Ae":
						tmpObj = $store.state.flow.GPF["G00"]["A"];
						break;
					case "Be":
						tmpObj = $store.state.flow.GPF["G00"]["B"];
						break;
					default:
						tmpObj = $store.state.flow.GPF[sGPF.value][sType.value];
						break;
				}
				return tmpObj;
			},
			set: () => {},
		});

		//* Define main polyline points
		const aPoly = computed({
			get: () => $store.state.flow.varMain.cpSelLine,
			set: () => {},
		});
		const sPoly = () => aPoly.value;
		// const aPoly = () => {
		// 	let sPts = "";
		// 	let sLado;
		// 	let iPara;
		// 	// if (sGPF == "Ai" || objCP.value == {}) {
		// 	// 	sPts = "0 0 0 0";
		// 	// 	return sPts;
		// 	// }
		// 	switch (sGPF.value) {
		// 		case "Ai":
		// 			sPts += xyGPF["G01"]["CPts"][posEnt.value + "i"]["X"] + ",";
		// 			sPts += xyGPF["G01"]["CPts"][posEnt.value + "i"]["Y"] - 150 + " ";
		// 			sPts += flat(xyGPF["G01"]["CPts"][posEnt.value + "i"]) + " ";
		// 			sPts += flat(xyGPF["G01"]["CPts"]["C"]);
		// 			break;

		// 		case "Ae":
		// 			sPts += xyGPF["G01"]["CPts"][posEnt.value + "i"]["X"] + ",";
		// 			sPts += xyGPF["G01"]["CPts"][posEnt.value + "i"]["Y"] - 75 + " ";
		// 			sPts += flat(xyGPF["G01"]["CPts"][posEnt.value + "i"]) + " ";
		// 			break;

		// 		case "Be":
		// 			sPts = "180 20 180 180 200 180"; //! <-- TODO: Calc pts Be
		// 			break;

		// 		default:
		// 			if (objCP.value.nLado || objCP.value.nIE) {
		// 				let yOff = sType.value == "RX" ? 0 : gpfMain.gpfH;
		// 				sPts += xyGPF[sGPF.value]["CPts"]["C"]["X"] + " ";
		// 				sPts += xyGPF[sGPF.value]["CPts"]["C"]["Y"] + yOff + " ";

		// 				sLado = cLado(objCP.value.nLado) + cIE(objCP.value.nIE);
		// 				sPts += xyGPF[sGPF.value]["CPts"][sLado]["X"] + " ";
		// 				sPts += xyGPF[sGPF.value]["CPts"][sLado]["Y"] + yOff + " ";
		// 			} else {
		// 				sPts = "-20 -20 -20 -20";
		// 			}
		// 			break;
		// 	}
		// 	//> VERTICAL LINE

		// 	//> RETURN
		// 	return sPts;
		// };

		//* Get Main Line class
		const clsLin = () => {
			let sClass = "";
			switch (sGPF.value) {
				case "Ai":
					sClass = "RxA";
					break;
				case "Ae":
					sClass = "RxA";
					break;
				case "Be":
					sClass = "RxB";
					break;
				default:
					sType.value.slice(-2, -1) == "P" ? (sClass = "Pn") : (sClass = "Rx");
					sProd.value == "A" ? (sClass += "A") : false;
					sProd.value == "B" ? (sClass += "B") : false;
					sProd.value == "AB" ? (sClass += "AB") : false;
					!sProd.value ? (sClass += "0") : false;
					break;
			}
			return sClass;
		};
		//* Get Main Line Dasharray
		const daLin = () => {
			let sDA = "";
			if (cpSelID.value.slice(-2, -1) == "P") {
				sDA = "6 12";
			} else {
				sDA = "12 6";
			}
			return sDA;
		};

		//* RETURN
		return { cpSelID, sGPF, sType, cLado, cIE, aPoly, sPoly, clsLin, daLin };
	},
};
</script>

<style lang="scss" scoped>
//* --------------------------------- STYLE -------------------------------- *//
.isON {
	visibility: visible;
}
.isOFF {
	visibility: hidden;
}

polyline {
	fill: none;
	stroke-linejoin: round;
	stroke-linecap: round;
}

$RxW: 4px;
$PnW: 4px;

.Rx0 {
	stroke: $color_Pr_0;
	stroke-width: $RxW;
}
.Pn0 {
	stroke: $color_Pn_0;
	stroke-width: $PnW;
}
.RxA {
	stroke: $color_Pr_A;
	stroke-width: $RxW;
}
.PnA {
	stroke: $color_Pn_A;
	stroke-width: $PnW;
}
.RxB {
	stroke: $color_Pr_B;
	stroke-width: $RxW;
}
.PnB {
	stroke: $color_Pn_B;
	stroke-width: $PnW;
}
//* Mixed class
.RxAB {
	// stroke: mix($color_Pr_A, $color_Pr_B, 1);
	animation: mixRxAB 1s linear infinite alternate;
	stroke-width: $RxW;
}
.PnAB {
	// stroke: mix($color_Pn_A, $color_Pn_B, 0.5);
	animation: mixPnAB 1s linear infinite alternate;
	stroke-width: $PnW;
}

@keyframes mixRxAB {
	0% {
		stroke: $color_Pr_A;
	}
	20% {
		stroke: $color_Pr_A;
	}
	100% {
		stroke: $color_Pr_B;
	}
}
@keyframes mixPnAB {
	0% {
		stroke: $color_Pn_A;
	}
	20% {
		stroke: $color_Pn_A;
	}
	100% {
		stroke: $color_Pn_B;
	}
}

//* Selection line
.SelLin {
	stroke: rgba($positive, 0.5);
	// stroke-width: 12px;
	// mask: url("#mask");
}

.mSelLin {
	stroke: $color-l4;
	// stroke-width: 6px;
}

#gSelLin {
	// mask: url("#mask");
	// mask: url("#masktest");
}

// #flowSelLin {
// 	mask: url("#maskSLTeste");
// }

.SelLin1 {
	animation: selLin1 1s linear 0s infinite forwards;
}
.mSelLin1 {
	animation: mselLin1 1s linear 0s infinite forwards;
}
.SelLin2 {
	animation: selLin1 1s linear 0.5s infinite forwards;
}
.mSelLin2 {
	animation: mselLin1 1s linear 0.5s infinite forwards;
}

@keyframes selLin1 {
	0% {
		stroke-width: 12px;
	}
	100% {
		stroke-width: 24px;
	}
}
@keyframes mselLin1 {
	0% {
		stroke-width: 4px;
	}
	100% {
		stroke-width: 24px;
	}
}
</style>
