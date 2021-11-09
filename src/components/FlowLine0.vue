<template>
	//* FLOW LINE
	<polyline
		id="mainLin"
		:points="aPoly()"
		:stroke-dasharray="daLin()"
		:class="clsLin()"
	>
		<animate
			attributeName="stroke-dashoffset"
			from="36"
			to="0"
			dur="3.6s"
			repeatCount="indefinite"
		/>
	</polyline>
</template>

<script>
import { computed, watch } from "vue";
import { useStore } from "vuex";
import {
	objectFlattener,
	getLastNth,
	convNLADO,
	convNIE,
} from "src/modules/helperFunction";
import { gpfMain, xyGPF } from "src/modules/xyGPFmain";

export default {
	name: "svgFlowLine",
	props: {
		sID: String,
	},
	setup(props) {
		const $store = useStore();
		const flat = (obj) => objectFlattener(obj);
		const cLado = (nLado) => convNLADO(nLado);
		const cIE = (nIE) => convNIE(nIE);

		// const nGavs = computed({
		// 	get: () => $store.state.flow.varMain.nGavs,
		// 	set: () => {},
		// });
		const cpSelID = computed({
			get: () => $store.state.flow.varMain.cpSel.id,
			set: () => $store.commit("flow/mutName"),
		});
		const sGPF = props.sID.slice(-2);
		const nGav = 0;
		const sType = "RX";
		const sAB = sGPF.charAt(0);
		const posEnt = computed({
			get: () => $store.state.flow.varMain.posEnt,
			set: () => {},
		});
		const posAB = computed({
			get: () => $store.state.flow.varMain.posAB,
			set: () => {},
		});
		const objCP = computed({
			get: () => $store.state.flow.GPF["G00"][sAB],
			set: () => {},
		});

		//* Define main polyline points
		const aPoly = () => {
			let sPts = "";
			let sLado;
			let iPara;
			//> If CP "active"
			if (objCP.value.nLado || objCP.value.nPara) {
				let offX = 0;
				let nxGPF;
				sAB == "B" && posAB.value == "AB" ? (offX = gpfMain.offXcp0) : false;
				sAB == "B" && posAB.value == "BA" ? (offX = -gpfMain.offXcp0) : false;
				if (sAB == "B") {
					//> If B: Upper start point
					sPts += xyGPF["G01"]["CPts"][posEnt.value + "i"]["X"] + offX + ",";
					sPts +=
						xyGPF["G01"]["CPts"][posEnt.value + "i"]["Y"] -
						2 * gpfMain.offYcp0 +
						" ";
				}
				//> Default Point
				sPts += xyGPF["G01"]["CPts"][posEnt.value + "i"]["X"] + offX + ",";
				sPts +=
					xyGPF["G01"]["CPts"][posEnt.value + "i"]["Y"] - gpfMain.offYcp0 + " ";
				//> G01: External
				sLado = cLado(objCP.value.nLado) + "e";
				sPts += xyGPF["G01"]["CPts"][sLado]["X"] + " ";
				sPts += xyGPF["G01"]["CPts"][sLado]["Y"] + " ";
				//> nPara: External
				nxGPF = "G" + ("0" + objCP.value.nPara).slice(-2);
				sPts += xyGPF[nxGPF]["CPts"][sLado]["X"] + " ";
				sPts += xyGPF[nxGPF]["CPts"][sLado]["Y"] + " ";
				//> nPara: Internal
				sLado = cLado(objCP.value.nLado) + "i";
				sPts += xyGPF[nxGPF]["CPts"]["C"]["X"] + " ";
				sPts += xyGPF[nxGPF]["CPts"]["C"]["Y"] + " ";
			} else {
				//> If CP not "active"
				sPts = "-20 -20 -20 -20";
			}

			//> RETURN
			return sPts;
		};

		//* Get Main Line class
		const clsLin = () => {
			return sGPF == "Ae" ? "RxA" : "RxB";
		};
		//* Get Main Line Dasharray
		const daLin = () => {
			let sDA = "";
			let lt = 36;
			let l0 = 28;
			sDA = l0 + " " + (lt - l0);
			return sDA;
		};

		//* Watch Drag and commit line info
		const timeStamp = computed({
			get: () => $store.state.flow.varMain.drag.lastDrop,
			set: () => {},
		});

		watch(timeStamp, () => {
			if ($store.state.flow.varMain.cpSel.id == sGPF) {
				$store.commit("flow/mutSetSLpts", aPoly());
			}
		});

		//* RETURN
		return {
			cpSelID,
			sGPF,
			sType,
			cLado,
			cIE,
			aPoly,
			clsLin,
			daLin,
		};
	},
};
</script>

<style lang="scss" scoped>
.isON {
	visibility: visible !important;
	opacity: 100% !important;
}
.isOFF {
	visibility: hidden !important;
	opacity: 0% !important;
}

polyline {
	fill: none;
	stroke-linejoin: round;
	stroke-linecap: round;
}

$RxW: 4px;
$PnW: 4px;

.arwRx0 {
	fill: $color_Pr_0;
}
.arwPn0 {
	fill: $color_Pn_0;
}
.arwRxA {
	fill: $color_Pr_A;
}
.arwPnA {
	fill: $color_Pn_A;
}
.arwRxB {
	fill: $color_Pr_B;
}
.arwPnB {
	fill: $color_Pn_B;
}

.Rx0 {
	stroke: $color_Pr_0;
	stroke-width: $RxW/2;
	opacity: 85%;
}
.Pn0 {
	stroke: $color_Pn_0;
	stroke-width: $PnW/2;
	opacity: 85%;
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

//* Arrows
.flwARW {
	marker-end: url(#flw-arwhead);
}

.flwARWH {
	// fill: red;
	// stroke: red;

	stroke-width: 4px;
	// transform-box: fill-box;
	// transform-origin: center;
	// transform: scale(0.8);
}

// #flw-arwhead {
// 	fill: azure;
// 	stroke: azure;
// 	stroke-width: 5px;
// }
</style>
